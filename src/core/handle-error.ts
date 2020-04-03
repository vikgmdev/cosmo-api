import BaseError from './abstract-error';
import { UnexpectedError } from './api-errors';
import logger from '../utils/logger';

const handleError = (err: Error | BaseError): Error => {
  if (err instanceof BaseError) {
    logger.error(err.toJSON(), 'Error caught');
    return err;
  }

  const error = new UnexpectedError(err.message);
  logger.error(error.toJSON(), 'Unexpected Error caught');
  return error;
};

export default handleError;
