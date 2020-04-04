/**
 * Find the user the give token is issued to
 *
 * @param  {Object}   token The parsed token
 * @param  {Function} cb    Callback to be called when a user is
 *                          found or an error has occured
 */

import { User } from '../../api/models';

export default async function findUserFromToken(token: any) {
  // deserialize the token iss
  const [_iss] = token.iss.split('|');

  const user = await User.findById(_iss).populate('roles');

  if (!user) {
    // throw notFound('Could not find User from given JWToken.');
  }

  return user;
}
