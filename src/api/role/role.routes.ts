import express from 'express';
import * as RoleController from './role.controller';

export default express.Router().get('/find', RoleController.find);
