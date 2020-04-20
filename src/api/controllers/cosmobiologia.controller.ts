import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { CosmobiologiaService } from '../services';

export const natal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /cosmobiologia/natal : no params');
    const result = await CosmobiologiaService.natal(req);
    logger.debug(`GET /cosmobiologia/natal response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
