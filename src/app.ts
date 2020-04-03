import bodyParser from 'body-parser';
import express from 'express';
import { config } from './config';
import routes from './api/routes';
import { connectDatabase } from './core';

const app = express();

app.use(bodyParser.json({ limit: config.requestLimit }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: config.requestLimit,
  }),
);
routes(app);
connectDatabase();

export default app;
