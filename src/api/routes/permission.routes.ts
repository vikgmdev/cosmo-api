import express from 'express';
import { PermissionController } from '../controllers';

export default express.Router().get('/find', PermissionController.find);
