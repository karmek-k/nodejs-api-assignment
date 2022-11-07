import { Container } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import ProductValidator from '../services/validation/ProductValidator';
import ProductController from '../controllers/ProductController';

const container = new Container();

container.bind<ProductRepository>(ProductRepository).to(ProductRepository);
container.bind<ProductValidator>(ProductValidator).to(ProductValidator);
container.bind<ProductController>(ProductController).to(ProductController);

export default container;
