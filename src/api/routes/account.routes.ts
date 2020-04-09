import express from 'express';
import { AccountController } from '../controllers';

export default express
  .Router()
  .get('/me', AccountController.me)
  .put('/update-password', AccountController.updatePassword);
