import express from 'express';
import { RoleController } from '../controllers';

export default express
  .Router()
  .get('/', RoleController.find)
  .get('/:id', RoleController.getById)
  .delete('/:id', RoleController.deleteById)
  .post('/', RoleController.create)
  .put('/:id', RoleController.update)
  .get('/:id/permissions', RoleController.getRolePermissions)
  .put('/:id/permissions', RoleController.updateRolePermissions);
