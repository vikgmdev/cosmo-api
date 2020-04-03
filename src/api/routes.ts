import { Application } from 'express';
import HealthRoutes from './health/health.routes';

export default function routes(app: Application): void {
  app.use('/health', HealthRoutes);
}
