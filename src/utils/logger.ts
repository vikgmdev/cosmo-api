import pino from 'pino';
import config from '../config/config';

const logger = pino({
  name: config.name,
  level: config.logLevel,
  prettyPrint: {
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
    colorize: true,
  },
});

export default logger;
