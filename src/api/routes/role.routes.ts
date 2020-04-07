import express from 'express';
import { RoleController } from '../controllers';

export default express
  .Router()
  .get('/find', RoleController.find)
  .get('/:roleId/permissions', RoleController.getRolePermissions);
