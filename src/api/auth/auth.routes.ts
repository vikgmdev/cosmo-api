import express from 'express';
import * as AuthController from './auth.controller';

export default express
  .Router()
  .get('/email/confirm', AuthController.confirmEmail)
  .get('/send-password-recovery-email', AuthController.sendPasswordRecoveryEmail)