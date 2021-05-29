import mongoose from 'mongoose';
// This is your real test secret API key.
const stripe = require('stripe')('sk_test_Mmn5hJ5DpJ8bsbTYCXi51sap00Tow54UH2');
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

export const health = async (): Promise<HealthResult> => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: 'usd',
  });
  console.log(paymentIntent);
  return {
    // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    clientSecret: paymentIntent.client_secret,
    // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    mongoose: MongooseStatesMap[getDatabaseConnectionStatus()],
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    version,
  };
};
