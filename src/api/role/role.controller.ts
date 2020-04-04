import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Helpers } from '../../helpers';
import { handleError } from '../../core';
import { logger } from '../../utils';
import * as RoleService from './role.service';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /role/find :', JSON.stringify(req.query));
    const result = await RoleService.find(req.query.filter || undefined, Helpers.utils.buildPaginationQuery(req.query));
    logger.debug('GET /role/find response:', JSON.stringify(result));
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
