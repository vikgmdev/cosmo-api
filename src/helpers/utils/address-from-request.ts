import { Request } from 'express';

export default async function addressFromRequest(req: Request): Promise<any> {
  if (req.connection && req.connection.remoteAddress) {
    return {
      ip: req.connection.remoteAddress,
      port: req.connection.remotePort,
    };
  }

  if (req.socket && req.socket.remoteAddress) {
    return {
      ip: req.socket.remoteAddress,
      port: req.socket.remotePort,
    };
  }

  // All done.
  return {
    ip: '0.0.0.0',
    port: 'n/a',
  };
}
