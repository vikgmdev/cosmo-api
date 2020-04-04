/**
 * Validates a token from an Express request object
 *
 * @param  {Express request}   req the Express request object
 * @param  {Function} cb  Callback when to be called when token
 *                        has been validated or an error has occured
 */
import { Request } from 'express';
import { Helpers } from '..';
import { UnauthorizedError } from '../../core';

export default async function validateTokenRequest(req: Request) {
  const token = await Helpers.token.getTokenFromRequest(req);

  if (!token) throw new UnauthorizedError();

  // validate the token
  const user = await Helpers.token.validateJwtToken(token);

  if (!user) throw new UnauthorizedError();

  req.me = user;

  // TODO: check if we're tracking usage
  /*
    if(sails.config.jsonWebTokens.trackUsage){
      var address = await sails.helpers.addressFromRequest(inputs.req);
      return await sails.helpers.trackTokenUsage(address, token, user, cb);
    }
    */

  return true;
}
