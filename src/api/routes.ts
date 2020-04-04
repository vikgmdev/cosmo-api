import { Application } from 'express';
import AuthRoutes from './routes/auth.routes';
import HealthRoutes from './routes/health.routes';
import PermissionRoutes from './routes/permission.routes';
import RoleRoutes from './routes/role.routes';
import UserRoutes from './routes/user.routes';

export default function routes(app: Application): void {
  app.use('/auth', AuthRoutes);
  app.use('/health', HealthRoutes);
  app.use('/permission', PermissionRoutes);
  app.use('/role', RoleRoutes);
  app.use('/user', UserRoutes);
}
