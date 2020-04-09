import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function checkPassword(password: string, hashedPassword: string): Promise<boolean> {
  return (await hashPassword(password)) === hashedPassword;
}
