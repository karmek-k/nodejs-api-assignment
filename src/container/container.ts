import { Container } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';

const container = new Container();

container.bind<ProductRepository>(ProductRepository).to(ProductRepository);

export default container;
