import express, { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import Config from '../config';
import ProductController from '../controllers/ProductController';
import ProductValidator from './validation/ProductValidator';

@injectable()
export default class App {
  private app: express.Application;

  constructor(
    @inject('Config') private config: Config,
    @inject(ProductController) private controller: ProductController,
    @inject(ProductValidator) private validator: ProductValidator
  ) {
    this.app = express();

    this.mountMiddleware();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.app.get('/products', this.controller.getAll);
    this.app
      .route('/products/:id')
      .get(this.controller.getOne)
      .post(this.validationMiddleware, this.controller.create)
      .put(this.validationMiddleware, this.controller.update)
      .delete(this.controller.delete);
  }

  // TODO: remove this
  private validationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (this.validator.validate(req.body)) {
        next();
      }

      res.status(400).json({ message: 'Validation failed' });
      return;
    };
  }

  private mountMiddleware() {
    this.app.use(express.json());
  }

  run(callback: (port: number | string) => string): void {
    const port = this.config.httpPort;

    this.app.listen(port, () => console.log(callback(port)));
  }
}
