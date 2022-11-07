import BaseResourceController from './BaseResourceController';
import { injectable } from 'inversify';
import ProductRepository from '../entities/repositories/ProductRepository';

@injectable()
export default class ProductController implements BaseResourceController {
  constructor(private repo: ProductRepository) {}

  create(req: Request, res: Response): void {}

  delete(req: Request, res: Response): void {}

  getAll(req: Request, res: Response): void {}

  getOne(req: Request, res: Response): void {}

  update(req: Request, res: Response): void {}
}
