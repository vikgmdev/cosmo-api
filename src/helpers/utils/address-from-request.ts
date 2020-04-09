import { Request } from 'express';
import { NetworkAddress } from '../../api/types';

export default async function addressFromRequest(req: Request): Promise<NetworkAddress> {
  if (req.connection && req.connection.remoteAddress) {
    return {
      ip: req.connection.remoteAddress,
      port: String(req.connection.remotePort),
    };
  }

  if (req.socket && req.socket.remoteAddress) {
    return {
      ip: req.socket.remoteAddress,
      port: String(req.socket.remotePort),
    };
  }

  // All done.
  return {
    ip: '0.0.0.0',
    port: 'n/a',
  };
}
