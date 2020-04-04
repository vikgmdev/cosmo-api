import express from 'express';
import { UserController } from '../controllers';

export default express.Router().get('/find', UserController.find);
