import pino from 'pino';
import { Config } from '../config';

const logger = pino({
  name: Config.app.name,
  level: Config.app.logLevel,
  prettyPrint: {
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
    colorize: true,
  },
});

export default logger;
