import { Request, Response } from 'express';
import BaseResourceController from './BaseResourceController';
import { inject, injectable } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';
import { symbols } from '../container/symbols';

@injectable()
export default class ProductController extends BaseResourceController {
  constructor(
    @inject(symbols.ProductRepository) private repo: ProductRepository
  ) {
    super();
  }

  async create(req: Request, res: Response): Promise<void> {
    res.json(await this.repo.create(req.body));
  }

  delete(req: Request, res: Response): void {}

  async getAll(req: Request, res: Response): Promise<void> {
    res.json(await this.repo.list());
  }

  getOne(req: Request, res: Response): void {}

  update(req: Request, res: Response): void {}
}
