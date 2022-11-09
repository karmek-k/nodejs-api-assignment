import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';

@injectable()
export default abstract class BaseResourceController
  implements interfaces.Controller
{
  abstract getAll(req: Request, res: Response): void;
  abstract getOne(req: Request, res: Response): void;
  abstract update(req: Request, res: Response): void;
  abstract create(req: Request, res: Response): void;
  abstract delete(req: Request, res: Response): void;
}
