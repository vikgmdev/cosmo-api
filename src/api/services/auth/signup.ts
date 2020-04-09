import { Request } from 'express';
import { Attempt, Role, User } from '../../models';
import { Config } from '../../../config';
import { Helpers } from '../../../helpers';
import { logger } from '../../../core';
import { Account } from '../../types';

export const signup = async (email: string, password: string, fullName: string, req: Request): Promise<Account> => {
  const newEmailAddress = email.toLowerCase();

  // Build up data for the new user record and save it to the database.
  // (Also use `fetch` to retrieve the new ID so that we can use it below.)
  const newUserRecord = await new User(
    Object.assign(
      {
        email: newEmailAddress,
        password: await Helpers.utils.passwords.hashPassword(password),
        fullName: fullName,
        tosAcceptedByIp: req.ip,
      },
      Config.auth.verifyEmailAddresses
        ? {
            emailProofToken: await Helpers.utils.randomString(),
            emailProofTokenExpiresAt: Date.now() + Config.auth.emailProofTokenTTL,
            emailStatus: 'unconfirmed',
          }
        : {},
    ),
  ).save();

  const defaultRole = await Role.findOne({
    isDefaultRole: true,
  });

  if (defaultRole) {
    newUserRecord.roles = [...newUserRecord.roles, defaultRole.id];
    newUserRecord.save();
  }

  // Store the user's new id in their session.
  req.me = newUserRecord;

  if (Config.auth.verifyEmailAddresses) {
    // Send "confirm account" email
    await Helpers.utils.sendTemplateEmail({
      to: newEmailAddress,
      subject: 'Por favor confirme su cuenta',
      template: 'email-verify-account',
      templateData: {
        fullName: fullName,
        token: newUserRecord.emailProofToken,
      },
    });
  } else {
    logger.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
  }

  const address = await Helpers.utils.addressFromRequest(req);

  const attempt = {
    user: newUserRecord.id,
    successful: true,
    ...address,
  };

  new Attempt(attempt).save((err) => {
    // Return a modified error here (or a special exit signal)
    // and .create() will throw that instead
    if (err) logger.warn(err);
  });

  //Returns the token immediately
  const jwtData = await Helpers.token.createToken(req, newUserRecord, false);

  // Send success response (this is where the session actually gets persisted)
  return {
    ...newUserRecord.toJSON(),
    accessToken: jwtData.token,
    refreshToken: jwtData.expires,
  };
};
