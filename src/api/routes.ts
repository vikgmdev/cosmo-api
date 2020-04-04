import { Application } from 'express';
import AuthRoutes from './auth/auth.routes';
import HealthRoutes from './health/health.routes';
import PermissionRoutes from './permission/permission.routes';
import RoleRoutes from './role/role.routes';
import UserRoutes from './user/user.routes';

export default function routes(app: Application): void {
  app.use('/auth', AuthRoutes);
  app.use('/health', HealthRoutes);
  app.use('/permission', PermissionRoutes);
  app.use('/role', RoleRoutes);
  app.use('/user', UserRoutes);
}
