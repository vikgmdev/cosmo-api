/**
 * Interface for database configuration settings
 *
 * @interface DatabaseConfig
 */
interface DatabaseConfig {
  mongoHost: string;
  mongoPort: number;
  mongoDB: string;
  mongoPassword?: string;
  mongoUser?: string;
  useAuth: boolean;
}

// default settings are for development environment
const databaseConfig: DatabaseConfig = {
  mongoHost: process.env.MONGO_HOST || '127.0.0.1',
  mongoPort: Number(process.env.MONGO_PORT) || 27017,
  mongoDB: process.env.MONGO_DB || 'db',
  mongoUser: process.env.USE_AUTH === 'true' ? process.env.MONGO_USER : '',
  mongoPassword: process.env.USE_AUTH === 'true' ? process.env.MONGO_PASSWORD : '',
  useAuth: Boolean(process.env.USE_AUTH) || false,
};

export default databaseConfig;
