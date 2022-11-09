import ValidatorInterface from './ValidatorInterface';
import Product from '../../entities/Product';
import { injectable } from 'inversify';

@injectable()
export default class ProductCreateValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Partial<Product>): boolean {
    if (!entity.name || !entity.price) {
      return false;
    }

    return entity.name.length <= 100;
  }
}
