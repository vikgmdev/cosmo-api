import { Request, Response, NextFunction } from 'express';
import { Helpers } from '../../helpers';

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const isValidToken = await Helpers.token.validateTokenRequest(req);

  if (isValidToken) {
    return next();
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  throw 'unauthorized';
}
