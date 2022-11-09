import ValidatorInterface from './ValidatorInterface';
import Product from '../../entities/Product';
import { inject, injectable } from 'inversify';
import { symbols } from '../../container/symbols';
import ProductCreateValidator from './ProductCreateValidator';

@injectable()
export default class ProductUpdateValidator
  implements ValidatorInterface<Product>
{
  constructor(
    @inject(symbols.ProductCreateValidator)
    private createValidator: ProductCreateValidator
  ) {}

  validate(entity: Partial<Product>): boolean {
    return entity.id !== undefined && this.createValidator.validate(entity);
  }
}
