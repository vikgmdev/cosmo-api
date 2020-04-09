import { Application } from 'express';
import AuthRoutes from './routes/auth.routes';
import HealthRoutes from './routes/health.routes';
import PermissionRoutes from './routes/permission.routes';
import RoleRoutes from './routes/role.routes';
import UserRoutes from './routes/user.routes';
import { isLoggedIn } from './middlewares';

export default function routes(app: Application): void {
  app.use('/auth', AuthRoutes);
  app.use('/health', isLoggedIn, HealthRoutes);
  app.use('/permission', isLoggedIn, PermissionRoutes);
  app.use('/role', isLoggedIn, RoleRoutes);
  app.use('/user', isLoggedIn, UserRoutes);
}
