/**
 * Creates a new JWT token
 */
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuid from 'node-uuid';
import { Config } from '../../config';
import { UserModel } from '../../api/models';

interface TokenData {
  token: string;
  expires: string;
}

export default async function createToken(req: Request, user: UserModel, rememberMe = false): Promise<TokenData> {
  const jsonWebTokens = Config.jwt || {};
  const expiryUnit = (jsonWebTokens.expiry && jsonWebTokens.expiry.unit) || 'days';
  const expiryLength = rememberMe
    ? (jsonWebTokens.expiry && jsonWebTokens.expiry.rememberMeMaxLength) || 30
    : (jsonWebTokens.expiry && jsonWebTokens.expiry.length) || 7;
  // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const expires = moment().add(expiryLength, expiryUnit).valueOf();
  const issued = Date.now();

  const token = jwt.sign(
    {
      iss: user.id + '|' + req.connection.remoteAddress,
      sub: jsonWebTokens.subject,
      aud: jsonWebTokens.audience,
      exp: expires,
      nbf: issued,
      iat: issued,
      jti: uuid.v1(),
    },
    jsonWebTokens.secret,
  );

  return {
    token,
    expires,
  };
}
