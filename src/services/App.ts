import express, { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import Config from '../config';
import ProductController from '../controllers/ProductController';
import ProductValidator from './validation/ProductValidator';
import { symbols } from '../container/symbols';

@injectable()
export default class App {
  private app: express.Application;

  constructor(
    @inject(symbols.Config) private config: Config,
    @inject(symbols.ProductController) private controller: ProductController,
    @inject(symbols.ProductValidator) private validator: ProductValidator
  ) {
    const app = express();

    this.mountMiddleware(app);
    this.mountRoutes(app);

    this.app = app;
  }

  private mountRoutes(app: express.Application) {
    app.get('/products', this.controller.getAll);
    app
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

  private mountMiddleware(app: express.Application) {
    app.use(express.json());
  }

  run(callback: (port: number | string) => string): void {
    const port = this.config.httpPort;

    this.app.listen(port, () => console.log(callback(port)));
  }
}
