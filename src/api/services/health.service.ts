import mongoose from 'mongoose';
// @ts-ignore
import { version } from '../../../package.json';

interface HealthResult {
  mongoose: string;
  nodeVersion: string;
  uptimeSeconds: number;
  version: string;
}

export const MongooseStates = {
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTING: 'disconnecting',
  UNKNOWN: 'unknown',
};

const MongooseStatesMap = {
  0: MongooseStates.DISCONNECTED,
  1: MongooseStates.CONNECTED,
  2: MongooseStates.CONNECTING,
  3: MongooseStates.DISCONNECTING,
  99: MongooseStates.UNKNOWN,
};

function getDatabaseConnectionStatus(): number {
  if (mongoose && mongoose.connection) {
    return mongoose.connection.readyState;
  }
  return 99;
}

export const health = (): HealthResult => {
  return {
    // @ts-ignore
    mongoose: MongooseStatesMap[getDatabaseConnectionStatus()],
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    version,
  };
};
