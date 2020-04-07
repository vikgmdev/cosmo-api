import { Request } from 'express';
import { Helpers } from '../../../helpers';
import { User } from '../../models';

export const updatePassword = async (currentPassword: string, newPassword: string, req: Request): Promise<any> => {
  // If the password doesn't match, then also exit thru "badCombo".
  try {
    await Helpers.utils.passwords.checkPassword(currentPassword, req.me.password);
  } catch (err) {
    throw new Error('The provided current password is invalid.');
  }

  // Hash the new password.
  const newPasswordHash = await Helpers.utils.passwords.hashPassword(newPassword);

  // Update the record for the logged-in user.
  await User.findByIdAndUpdate(req.me.id, {
    password: newPasswordHash,
  });

  return { message: 'The password was successfully updated.' };
};
