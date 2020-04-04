import express from 'express';
import { AuthController } from '../controllers';

export default express
  .Router()
  .get('/email/confirm', AuthController.confirmEmail)
  .get('/send-password-recovery-email', AuthController.sendPasswordRecoveryEmail)
  .post('/signup', AuthController.signup)
  .post('/update-password-and-login', AuthController.updatePasswordAndLogin)
  .put('/login', AuthController.login);
