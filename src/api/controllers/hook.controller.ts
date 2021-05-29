import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { CalendlyService } from '../services';

export const calendlyCreated = async (req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.debug(`POST /calendly/created : ${JSON.stringify(req.body)}`);
    const body = req.body;
    const result = await CalendlyService.calendlyCreated(body);
    logger.debug(`POST /calendly/created result: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json();
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const calendlyCanceled = async (req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.debug(`POST /calendly/canceled : ${JSON.stringify(req.body)}`);
    const body = req.body;
    const result = await CalendlyService.calendlyCanceled(body);
    logger.debug(`POST /calendly/canceled result: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json();
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
