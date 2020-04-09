/**
 * Get current access token
 * @param req
 */
import { Request } from 'express';

export default async function getTokenFromRequest(req: Request): Promise<string> {
  // Get access token.
  let accessToken;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');
    if (scheme && credentials) {
      if (/^Bearer$/i.test(scheme)) {
        accessToken = credentials;
      }
    }
  } else {
    const params = { ...req.params, ...req.headers, ...req.query };
    accessToken = params.access_token;
  }

  // Send back the result through the success exit.
  return accessToken;
}
