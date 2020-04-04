import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Helpers } from '../../helpers';
import { handleError } from '../../core';
import { logger } from '../../utils';
import * as PermissionService from './permission.service';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /permission/find :', JSON.stringify(req.query));
    const result = await PermissionService.find(req.query.filter || undefined, Helpers.utils.buildPaginationQuery(req.query));
    logger.debug('GET /permission/find response:', JSON.stringify(result));
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
