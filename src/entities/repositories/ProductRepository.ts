import { injectable } from 'inversify';
import RepositoryInterface from './RepositoryInterface';
import Product, { ProductCreateDto, ProductUpdateDto } from '../Product';

@injectable()
export default class ProductRepository implements RepositoryInterface<Product> {
  constructor() {}

  create(dto: ProductCreateDto): Product {
    return undefined;
  }

  delete(id: number): Product {
    return undefined;
  }

  details(): Product {
    return undefined;
  }

  list(): Product[] {
    return [];
  }

  update(dto: ProductUpdateDto): Product {
    return undefined;
  }
}
