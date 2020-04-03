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