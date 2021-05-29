import express from 'express';
import { AccountController, CosmobiologiaController } from '../controllers';

export default express
  .Router()
  .get('/me', AccountController.me)
  .get('/natal', CosmobiologiaController.meNatal)
  .get('/progresado', CosmobiologiaController.meProgresado)
  .get('/life', CosmobiologiaController.meLife)
  .get('/appointments', AccountController.appointments)
  .get('/appointments/next', AccountController.nextAppointment)
  .put('/update-password', AccountController.updatePassword);
