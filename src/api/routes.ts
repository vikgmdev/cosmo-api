import { Application } from 'express';
import AuthRoutes from './auth/auth.routes';
import HealthRoutes from './health/health.routes';

export default function routes(app: Application): void {
  app.use('/auth', AuthRoutes);
  app.use('/health', HealthRoutes);
}
