import { Container } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import ProductValidator from '../services/validation/ProductValidator';
import ProductController from '../controllers/ProductController';
import { Database } from 'sqlite3';
import Config from '../config';
import App from '../services/App';

const container = new Container();

container.bind<Config>('Config').toConstantValue({
  databaseFile: process.env.DB_NAME ?? 'products.db',
  httpPort: process.env.PORT ?? 8000
});

container.bind<Database>(Database).toDynamicValue(ctx => {
  const dbName = ctx.container.get<Config>('Config').databaseFile;

  return new Database(dbName, err => {
    if (err) {
      throw new Error(`Error while connecting to the db: ${err.message}`);
    }
  });
});

container.bind<ProductRepository>(ProductRepository).to(ProductRepository);
container.bind<ProductValidator>(ProductValidator).to(ProductValidator);
container.bind<ProductController>(ProductController).to(ProductController);

container.bind<App>(App).to(App);

export default container;
