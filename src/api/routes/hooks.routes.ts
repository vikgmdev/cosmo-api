import express from 'express';
import { HookController } from '../controllers';

export default express
  .Router()
  .post('/calendly/created', HookController.calendlyCreated)
  .post('/calendly/canceled', HookController.calendlyCanceled);
