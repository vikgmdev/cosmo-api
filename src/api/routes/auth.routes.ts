import express from 'express';
import { AuthController } from '../controllers';

export default express
  .Router()
  .get('/email/confirm', AuthController.confirmEmail)
  .get('/send-password-recovery-email', AuthController.sendPasswordRecoveryEmail)
  .post('/signup', AuthController.signup)
  .post('/recover-password', AuthController.recoverPassword)
  .put('/login', AuthController.login);
