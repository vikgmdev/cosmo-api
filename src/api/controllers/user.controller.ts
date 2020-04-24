import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Helpers } from '../../helpers';
import { handleError, logger } from '../../core';
import { UserService } from '../services';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /user : ${JSON.stringify(req.query)}`);
    const { filter = '{}' } = req.query;
    const result = await UserService.find(JSON.parse(filter), Helpers.utils.buildPaginationQuery(req.query));
    logger.debug(`GET /user response: ${JSON.stringify(result)}`);
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

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`DELETE /user/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await UserService.deleteById(id);
    logger.debug(`DELETE /user/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const user = req.body;
    logger.debug(`PUT /user/:id : ${JSON.stringify(id, user)}`);
    const result = await UserService.update(id, user);
    logger.debug(`PUT /user/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const updateUserRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`PUT /user/:id/roles : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const roles = req.body;
    const result = await UserService.updateUserRoles(id, roles);
    logger.debug(`PUT /user/:id/roles response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
