import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { buildPaginationQuery } from '../../helpers';
import { handleError } from '../../core';
import { logger } from '../../utils';
import * as UserService from './user.service';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /user/find :', JSON.stringify(req.query));
    const result = await UserService.find(req.query.filter || undefined, buildPaginationQuery(req.query));
    logger.debug('GET /user/find response:', JSON.stringify(result));
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
