import express from 'express';
import { CosmobiologiaController } from '../controllers';

export default express.Router().get('/natal', CosmobiologiaController.natal);
