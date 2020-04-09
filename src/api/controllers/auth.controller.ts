import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { AuthService } from '../services';

export const confirmEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.query;
    logger.debug(`GET /auth/email/confirm : secret params`);
    const result = await AuthService.confirmEmail(token, req);
    logger.debug(`GET /auth/email/confirm response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const sendPasswordRecoveryEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.query;
    logger.debug(`GET /auth/send-password-recovery-email : ${JSON.stringify({ email })}`);
    const result = await AuthService.sendPasswordRecoveryEmail(email);
    logger.debug(`GET /auth/send-password-recovery-email response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, fullName } = req.body;
    logger.debug(`POST /auth/signup : ${JSON.stringify({ email, fullName })}`);
    const result = await AuthService.signup(email, password, fullName, req);
    logger.debug(`POST /auth/signup response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const recoverPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password, token } = req.body;
    logger.debug(`POST /auth/recover-password : secret params`);
    const result = await AuthService.recoverPassword(password, token, req);
    logger.debug(`POST /auth/recover-password response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, rememberMe = false } = req.body;
    logger.debug(`PUT /auth/login : ${JSON.stringify({ email })}`);
    const result = await AuthService.login(email, password, rememberMe, req);
    logger.debug(`PUT /auth/login response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
