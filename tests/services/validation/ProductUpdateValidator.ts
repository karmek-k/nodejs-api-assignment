import Product from '../../../src/entities/Product';
import ValidatorInterface from '../../../src/services/validation/ValidatorInterface';
import container from '../../../src/container/container';
import ProductUpdateValidator from '../../../src/services/validation/ProductUpdateValidator';
import { symbols } from '../../../src/container/symbols';

describe('ProductUpdateValidator tests', function () {
  let validator: ValidatorInterface<Product>;

  beforeEach(() => {
    validator = container.get<ProductUpdateValidator>(
      symbols.ProductCreateValidator
    );
  });

  it('should return true for a valid payload', () => {
    const payload: Partial<Product> = {
      id: 1,
      name: 'keyboard',
      price: 100
    };

    expect(validator.validate(payload)).toBeTruthy();
  });

  it('should return false if there is no id', function () {});

  it('should return false if id is null', function () {});
});
