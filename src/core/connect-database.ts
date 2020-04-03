import mongoose from 'mongoose';
import { logger } from '../utils';
import { databaseConfig } from '../config';

const connectDatabase = (): void => {
  const userPass =
    databaseConfig.mongoUser && databaseConfig.mongoPassword
      ? `${databaseConfig.mongoUser}:${databaseConfig.mongoPassword}@`
      : '';
  const connectionURI = `mongodb://${userPass}${databaseConfig.mongoHost}:${databaseConfig.mongoPort}/${databaseConfig.mongoDB}`;
  mongoose.connect(connectionURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const { connection } = mongoose;
  connection.on('error', (err) => logger.error('MongoDB connection error', err));
  connection.once('open', () => {
    logger.debug(
      `✔ MongoDB connection stablished at mongodb://${databaseConfig.mongoHost}:${databaseConfig.mongoPort}/${databaseConfig.mongoDB}`,
    );
  });
};

export default connectDatabase;
