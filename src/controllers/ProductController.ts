import { inject } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import { symbols } from '../container/symbols';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  requestBody,
  requestParam
} from 'inversify-express-utils';
import Product, {
  ProductCreateDto,
  ProductUpdateDto
} from '../entities/Product';
import ProductValidator from '../services/validation/ProductValidator';
import { JsonResult } from 'inversify-express-utils/lib/results';

@controller('/products')
export default class ProductController extends BaseHttpController {
  constructor(
    @inject(symbols.ProductRepository) private repo: ProductRepository,
    @inject(symbols.ProductValidator) private validator: ProductValidator
  ) {
    super();
  }

  @httpGet('/')
  async getAll(): Promise<Product[]> {
    return await this.repo.list();
  }

  @httpGet('/:id')
  async getOne(@requestParam('id') id: number): Promise<Product | JsonResult> {
    const item = await this.repo.details(id);

    if (item) {
      return item;
    }

    return this.json({ msg: 'Not found' }, 404);
  }

  @httpPost('/')
  async create(@requestBody() dto: ProductCreateDto): Promise<Product> {
    return this.repo.create(dto);
  }

  @httpPut('/')
  async update(
    @requestBody() dto: ProductUpdateDto
  ): Promise<Product | JsonResult> {
    const item = await this.repo.update(dto);

    if (item) {
      return item;
    }

    return this.json({ msg: 'Not found' }, 404);
  }

  @httpDelete('/:id')
  async delete(@requestParam('id') id: number): Promise<Product | JsonResult> {
    const item = await this.repo.delete(id);

    if (item) {
      return item;
    }

    return this.json({ msg: 'Not found' }, 404);
  }
}
