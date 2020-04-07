import express from 'express';
import { UserController } from '../controllers';

export default express
  .Router()
  .get('/', UserController.find)
  .get('/:id', UserController.getById);
