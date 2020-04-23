import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { Config } from './config';
import routes from './api/routes';
import { connectDatabase } from './core';

const app = express();

app.use(bodyParser.json({ limit: Config.app.requestLimit }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: Config.app.requestLimit,
  }),
);
app.use(
  cors({
    origin: 'http://localhost:4200',
  }),
);
routes(app);
connectDatabase();

export default app;
