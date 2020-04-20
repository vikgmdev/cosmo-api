import './core/env';
import { Config } from './config';
import { logger } from './core';
import app from './app';
import seeds from './seed';

const seed = process.argv.find((arg) => arg === 'seed');

app.listen({ port: Config.app.port }, (): void => {
  console.log(process.env.MONGO_HOST)
  logger.info(`🚀 ${Config.app.name} up and running in ${Config.app.env} @ http://localhost:${Config.app.port}`);
  if (seed) {
    seeds.populatePermissions();
    seeds.populateAuthPermissions();
    seeds.populateRoles();
  }
});
