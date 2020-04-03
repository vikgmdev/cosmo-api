import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { HealthService } from '../services';
import { logger } from '../../utils';
import { handleError } from '../../core';

export const health = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.debug('GET /health : no params');
    const result = HealthService.health();
    logger.debug(`GET /health response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
