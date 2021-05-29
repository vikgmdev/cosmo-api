import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { CosmobiologiaService } from '../services';

export const natal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /cosmobiologia/natal : ${JSON.stringify(req.query)}`);
    const result = await CosmobiologiaService.natal(req.query);
    logger.debug(`GET /cosmobiologia/natal response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const progresado = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /cosmobiologia/progresado : ${JSON.stringify(req.query)}`);
    const result = await CosmobiologiaService.progresado(req.query);
    logger.debug(`GET /cosmobiologia/progresado response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const life = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /cosmobiologia/life : ${JSON.stringify(req.query)}`);
    const result = await CosmobiologiaService.life(req.query);
    logger.debug(`GET /cosmobiologia/life response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const meNatal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/natal : no params');
    const { me } = req;
    const result = await CosmobiologiaService.meNatal(me);
    logger.debug(`GET /account/natal response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const meProgresado = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/progresado : no params');
    const { me } = req;
    const result = await CosmobiologiaService.meProgresado(me);
    logger.debug(`GET /account/progresado response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const meLife = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/life : no params');
    const { me } = req;
    const result = await CosmobiologiaService.meLife(me);
    logger.debug(`GET /account/life response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
