import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { Helpers } from '../../helpers';
import { handleError, logger } from '../../core';
import { RoleService } from '../services';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /role/find : ${JSON.stringify(req.query)}`);
    const result = await RoleService.find(req.query.filter || undefined, Helpers.utils.buildPaginationQuery(req.query));
    logger.debug(`GET /role/find response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /role/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await RoleService.getById(id);
    logger.debug(`GET /role/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`DELETE /role/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await RoleService.deleteById(id);
    logger.debug(`DELETE /role/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`POST /role : ${JSON.stringify(req.body)}`);
    const role = req.body;
    const result = await RoleService.create(role);
    logger.debug(`POST /role response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const role = req.body;
    logger.debug(`PUT /role/:id : ${JSON.stringify(id, role)}`);
    const result = await RoleService.update(id, role);
    logger.debug(`PUT /role/:id response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const getRolePermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roleId } = req.params;
    logger.debug(`GET /role/:roleId/permissions : ${JSON.stringify(req.params)}`);
    const result = await RoleService.getRolePermissions(roleId);
    logger.debug(`GET /role/:roleId/permissions response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const updateRolePermissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roleId } = req.params;
    const permissions = req.body;
    logger.debug(`PUT /role/:roleId/permissions : ${JSON.stringify({ roleId, permissions })}`);
    const result = await RoleService.updateRolePermissions(roleId, permissions);
    logger.debug(`PUT /role/:roleId/permissions response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
