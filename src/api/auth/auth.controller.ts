import { Request, Response, NextFunction } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError } from '../../core';
import { logger } from '../../utils';
import * as AuthService from './auth.service';

export const confirmEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { token } = req.query;
        logger.debug('GET /auth/email/confirm : secret params');
        const result = await AuthService.confirmEmail(token);
        logger.debug('GET /auth/email/confirm response:', JSON.stringify(result));
        res.status(HTTPStatus.OK).json(result);
        return next();
    } catch (err) {
        return next(handleError(err));
    }
}

export const sendPasswordRecoveryEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = req.query;
        logger.debug('GET /auth/send-password-recovery-email :', JSON.stringify({ email }));
        const result = await AuthService.sendPasswordRecoveryEmail(email);
        logger.debug('GET /auth/send-password-recovery-email response:', JSON.stringify(result));
        res.status(HTTPStatus.OK).json(result);
        return next();
    } catch (err) {
        return next(handleError(err));
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password, fullname } = req.body;
        logger.debug('POST /auth/signup :', JSON.stringify({ email, fullname }));
        const result = await AuthService.signup(email, password, fullname);
        logger.debug('POST /auth/signup response:', JSON.stringify(result));
        res.status(HTTPStatus.OK).json(result);
        return next();
    } catch (err) {
        return next(handleError(err));
    }
}

export const updatePasswordAndLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { password, token } = req.body;
        logger.debug('POST /auth/update-password-and-login : secret params');
        const result = await AuthService.updatePasswordAndLogin(password, token);
        logger.debug('POST /auth/update-password-and-login response:', JSON.stringify(result));
        res.status(HTTPStatus.OK).json(result);
        return next();
    } catch (err) {
        return next(handleError(err));
    }
}
