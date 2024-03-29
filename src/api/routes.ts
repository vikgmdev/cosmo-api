import { Application } from 'express';
import AccountRoutes from './routes/account.routes';
import AppointmentRoutes from './routes/appointment.routes';
import CosmobiologiaRoutes from './routes/cosmobiologia.routes';
import AuthRoutes from './routes/auth.routes';
import HealthRoutes from './routes/health.routes';
import HooksRoutes from './routes/hooks.routes';
import PermissionRoutes from './routes/permission.routes';
import RoleRoutes from './routes/role.routes';
import UserRoutes from './routes/user.routes';
import { isLoggedIn } from './middlewares';

export default function routes(app: Application): void {
  // Public
  app.use('/auth', AuthRoutes);
  app.use('/cosmobiologia', CosmobiologiaRoutes);
  app.use('/health', HealthRoutes);
  app.use('/hooks', HooksRoutes);

  // Private : Token needed
  app.use('/account', isLoggedIn, AccountRoutes);
  app.use('/appointment', isLoggedIn, AppointmentRoutes);
  app.use('/permission', isLoggedIn, PermissionRoutes);
  app.use('/role', isLoggedIn, RoleRoutes);
  app.use('/user', isLoggedIn, UserRoutes);
}
