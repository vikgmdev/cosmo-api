import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Helpers } from '../../helpers';
import { handleError, logger } from '../../core';
import { UserService } from '../services';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /user/find : ${JSON.stringify(req.query)}`);
    const result = await UserService.find(req.query.filter || undefined, Helpers.utils.buildPaginationQuery(req.query));
    logger.debug(`GET /user/find response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /user/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await UserService.getById(id);
    logger.debug(`GET /user/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
