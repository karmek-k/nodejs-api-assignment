import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './container';

let server = new InversifyExpressServer(container);
server.setConfig((app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

export default server;
