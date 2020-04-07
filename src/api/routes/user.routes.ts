import express from 'express';
import { UserController } from '../controllers';

export default express
  .Router()
  .get('/', UserController.find)
  .get('/:id', UserController.getById)
  .delete('/:id', UserController.deleteById)
  .put('/:id', UserController.update)
  .put('/:id/roles', UserController.updateUserRoles);
