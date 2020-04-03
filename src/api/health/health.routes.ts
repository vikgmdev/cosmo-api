import express from 'express';
import * as HealthController from './health.controller';

export default express
  .Router()
  .get('/', HealthController.health);
