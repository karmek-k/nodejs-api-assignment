import { Container, interfaces } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import ProductValidator from '../services/validation/ProductValidator';
import ProductController from '../controllers/ProductController';
import { Database } from 'sqlite3';
import Config from '../config';
import App from '../services/App';
import { symbols } from './symbols';

const container = new Container();

container.bind<Config>(symbols.Config).toConstantValue({
  databaseFile: process.env.DB_NAME ?? 'products.db',
  httpPort: process.env.PORT ?? 8000
});

container
  .bind<interfaces.Factory<Database>>(symbols.Database)
  .toFactory<Database>(ctx => {
    return () => {
      const dbName = ctx.container.get<Config>(symbols.Config).databaseFile;

      return new Database(dbName, err => {
        if (err) {
          throw new Error(`Error while connecting to the db: ${err.message}`);
        }
      });
    };
  });

container
  .bind<ProductRepository>(symbols.ProductRepository)
  .to(ProductRepository);
container.bind<ProductValidator>(symbols.ProductValidator).to(ProductValidator);
container
  .bind<ProductController>(symbols.ProductController)
  .to(ProductController);

container.bind<App>(symbols.App).to(App);

export default container;
