import { Container } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import ProductValidator from '../services/validation/ProductValidator';
import ProductController from '../controllers/ProductController';
import Database from '../services/Database';
import Config from '../config';
import { symbols } from './symbols';

const container = new Container();

container.bind<Config>(symbols.Config).toConstantValue({
  databaseFile: process.env.DB_NAME ?? 'products.db',
  httpPort: process.env.PORT ?? 8000
});

container.bind<Database>(symbols.Database).to(Database);

container
  .bind<ProductRepository>(symbols.ProductRepository)
  .to(ProductRepository);
container.bind<ProductValidator>(symbols.ProductValidator).to(ProductValidator);
container
  .bind<ProductController>(symbols.ProductController)
  .to(ProductController);

export default container;
