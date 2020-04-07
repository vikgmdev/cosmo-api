import express from 'express';
import { RoleController } from '../controllers';

export default express
  .Router()
  .get('/', RoleController.find)
  .get('/:id', RoleController.getById)
  .post('/', RoleController.create)
  .get('/:id/permissions', RoleController.getRolePermissions)
  .put('/:id/permissions', RoleController.updateRolePermissions);
