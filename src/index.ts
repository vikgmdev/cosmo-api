import { config } from './config';
import { logger } from './utils';
import app from './app';

app.listen({ port: config.port }, (): void => {
    logger.info(`🚀 ${config.name} up and running in ${config.env} @ http://localhost:${config.port}`);
});
