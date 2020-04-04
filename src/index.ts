import './core/env';
import { Config } from './config';
import { logger } from './core';
import app from './app';

app.listen({ port: Config.app.port }, (): void => {
  logger.info(`🚀 ${Config.app.name} up and running in ${Config.app.env} @ http://localhost:${Config.app.port}`);
});
