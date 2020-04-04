import express from 'express';
import { HealthController } from '../controllers';

export default express.Router().get('/', HealthController.health);
