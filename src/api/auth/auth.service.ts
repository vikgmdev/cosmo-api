import { User } from '../user/user.model';

export const confirmEmail = async (token: string): Promise<any> => {};

export const sendPasswordRecoveryEmail = async (email: string): Promise<any> => {};

export const signup = async (email: string, password: string, fullName: string): Promise<any> => {
  const mongooseUser = new User({
    email: email,
    password: password,
    fullName: fullName,
  });
  const newUserRecord = await mongooseUser.save();
  return newUserRecord;
};

export const updatePasswordAndLogin = async (password: string, token: string): Promise<any> => {};

export const login = async (email: string, password: string, rememberMe: boolean = false): Promise<any> => {};
