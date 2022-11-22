import 'reflect-metadata';
import container from '../../../src/container/container';
import ProductCreateValidator from '../../../src/services/validation/ProductCreateValidator';
import { symbols } from '../../../src/container/symbols';
import ValidatorInterface from '../../../src/services/validation/ValidatorInterface';
import Product from '../../../src/entities/Product';

describe('ProductCreateValidator tests', () => {
  let validator: ValidatorInterface<Product>;

  beforeEach(() => {
    validator = container.get<ProductCreateValidator>(
      symbols.ProductCreateValidator
    );
  });

  it('should return true for a valid payload', () => {
    const payload: Partial<Product> = {
      name: 'keyboard',
      price: 100
    };

    expect(validator.validate(payload)).toBeTruthy();
  });

  it('should return true for a name that is exactly 100 characters', function () {});

  it('should return false for a name that exceeds 100 characters', function () {});

  it('should return false for a name that is exactly 0 characters', function () {});

  it('should return false for a name that is null', function () {});

  it('should return false for an empty payload', function () {});
});
