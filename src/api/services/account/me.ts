import { Request } from 'express';
import { Helpers } from '../../../helpers';

export const me = async (req: Request): Promise<any> => {
  const token = await Helpers.token.getTokenFromRequest(req);

  if (!token) throw 'tokenNotPresent';

  // validate the token
  const user = await Helpers.token.validateJwtToken(token);

  if (!user) throw 'tokenInvalid';

  return user;
};
