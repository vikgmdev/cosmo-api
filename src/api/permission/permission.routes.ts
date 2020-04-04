import express from 'express';
import * as PermissionController from './permission.controller';

export default express.Router().get('/find', PermissionController.find);
