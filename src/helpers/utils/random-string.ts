import crypto from 'crypto';

export default async function randomString(): Promise<string> {
  return crypto.randomBytes(256).toString('hex');
}
