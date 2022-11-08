import { Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export default abstract class BaseResourceController {
  abstract getAll(req: Request, res: Response): void;
  abstract getOne(req: Request, res: Response): void;
  abstract update(req: Request, res: Response): void;
  abstract create(req: Request, res: Response): void;
  abstract delete(req: Request, res: Response): void;
}
