import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { CosmobiologiaService } from '../services';

export const natal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /cosmobiologia/natal : no params');
    const result = await CosmobiologiaService.natal();
    logger.debug(`GET /cosmobiologia/natal response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const progresado = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /cosmobiologia/progresado : no params');
    const result = await CosmobiologiaService.progresado();
    logger.debug(`GET /cosmobiologia/progresado response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const life = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /cosmobiologia/life : no params');
    const result = await CosmobiologiaService.life();
    logger.debug(`GET /cosmobiologia/life response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
