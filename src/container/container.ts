import { Container } from 'inversify';
import ProductRepository from '../services/repositories/ProductRepository';
import ProductCreateValidator from '../services/validation/ProductCreateValidator';
import ProductController from '../controllers/ProductController';
import Database from '../services/Database';
import Config from '../config';
import { symbols } from './symbols';
import ProductUpdateValidator from '../services/validation/ProductUpdateValidator';

const container = new Container();

container.bind<Config>(symbols.Config).toConstantValue({
  databaseFile: process.env.DB_NAME ?? 'products.db',
  httpPort: process.env.PORT ?? 8000
});

container.bind<Database>(symbols.Database).to(Database);

container
  .bind<ProductRepository>(symbols.ProductRepository)
  .to(ProductRepository);
container
  .bind<ProductCreateValidator>(symbols.ProductCreateValidator)
  .to(ProductCreateValidator);
container
  .bind<ProductUpdateValidator>(symbols.ProductUpdateValidator)
  .to(ProductUpdateValidator);
container
  .bind<ProductController>(symbols.ProductController)
  .to(ProductController);

export default container;
