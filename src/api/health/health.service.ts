import { version } from '../../../package.json';

interface HealthResult {
  nodeVersion: string;
  uptimeSeconds: number;
  version: string;
}

export const health = (): HealthResult => {
  return {
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    version,
  };
};
