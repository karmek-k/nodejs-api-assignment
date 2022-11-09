import { Request, Response } from 'express';
import BaseResourceController from './BaseResourceController';
import { inject } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import { symbols } from '../container/symbols';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  response
} from 'inversify-express-utils';

@controller('/products')
export default class ProductController extends BaseResourceController {
  constructor(
    @inject(symbols.ProductRepository) private repo: ProductRepository
  ) {
    super();
  }

  @httpPost('/')
  async create(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    res.json(await this.repo.create(req.body));
  }

  @httpDelete('/:id')
  delete(@request() req: Request, @response() res: Response): void {}

  @httpGet('/')
  async getAll(
    @request() req: Request,
    @response() res: Response
  ): Promise<void> {
    res.json(await this.repo.list());
  }

  @httpGet('/:id')
  getOne(@request() req: Request, @response() res: Response): void {}

  @httpPut('/:id')
  update(@request() req: Request, @response() res: Response): void {}
}
