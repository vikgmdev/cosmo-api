/**
 * Interface for application configuration settings
 *
 * @interface Config
 */
interface Config {
    name: string;
    port: number;
    env: string;
    debug: boolean;
    logLevel: string;
    version: string;
  }
  
  // default settings are for development environment
  const config: Config = {
    name: process.env.API_NAME || 'API Server',
    env: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'debug',
    debug: Boolean(process.env.DEBUG) || true,
    port: Number(process.env.PORT) || 3000,
    version: process.env.API_VERSION || '1.0.0'
  };
  
  export default config;
  