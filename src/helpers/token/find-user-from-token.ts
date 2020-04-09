/**
 * Find the user the give token is issued to
 *
 * @param  {Object}   token The parsed token
 * @param  {Function} cb    Callback to be called when a user is
 *                          found or an error has occured
 */
import { User, UserModel } from '../../api/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function findUserFromToken(token: any): Promise<UserModel> {
  // deserialize the token iss
  const [_iss] = token.iss.split('|');

  const user = await User.findById(_iss).populate('roles');

  if (!user) {
    throw 'Could not find User from given JWToken.';
  }

  return user;
}
