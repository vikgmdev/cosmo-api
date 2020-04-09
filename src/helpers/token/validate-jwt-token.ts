/**
 * Validates a token
 *
 * @param  {String}   token the token to be validated
 * @param  {Function} cb    called when error has occured or token is validated
 */
import jwt from 'jsonwebtoken';
import { Config } from '../../config';
import { Helpers } from '..';
import { UnauthorizedError } from '../../core';
import { UserModel } from '../../api/models';

export default async function validateJwtToken(token: string): Promise<UserModel> {
  // decode the token
  // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const _token = jwt.decode(token, Config.jwt.secret);

  if (!_token) throw new UnauthorizedError();

  // set the time of the request
  const _reqTime = Date.now();

  // If token is expired
  if (_token.exp <= _reqTime) {
    throw new UnauthorizedError();
  }

  // If token is early
  if (_reqTime <= _token.nbf) {
    throw new UnauthorizedError();
  }

  // If audience doesn't match
  if (Config.jwt.audience !== _token.aud) {
    throw new UnauthorizedError();
  }

  // Find the user the give token is issued to
  const user = await Helpers.token.findUserFromToken(_token);
  return user;
}
