import { Config } from '../../../config';
import { Helpers } from '../../../helpers';
import { User } from '../../models';

export const sendPasswordRecoveryEmail = async (email: string): Promise<any> => {
  // Find the record for this user.
  // (Even if no such user exists, pretend it worked to discourage sniffing.)
  var userRecord = await User.findOne({ email });
  if (!userRecord) {
    return {};
  }

  // Come up with a pseudorandom, probabilistically-unique token for use
  // in our password recovery email.
  var token = await Helpers.utils.randomString();

  // Store the token on the user record
  // (This allows us to look up the user when the link from the email is clicked.)
  await User.findByIdAndUpdate(userRecord.id, {
    passwordResetToken: token,
    passwordResetTokenExpiresAt: Date.now() + Config.auth.passwordResetTokenTTL,
  });

  // Send recovery email
  await Helpers.utils.sendTemplateEmail({
    to: email,
    subject: 'Restablecimiento de contraseña',
    template: 'email-reset-password',
    templateData: {
      fullname: userRecord.fullName,
      token: token,
    },
  });

  return { message: 'The recovery password email was successfully send.' };
};
