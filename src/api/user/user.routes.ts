import express from 'express';
import * as UserController from './user.controller';

export default express.Router().get('/find', UserController.find);
