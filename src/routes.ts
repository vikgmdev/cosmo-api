import { Application } from 'express';
import router from './api/router';

export default function routes(app: Application): void {
  app.use('/health', router);
}
