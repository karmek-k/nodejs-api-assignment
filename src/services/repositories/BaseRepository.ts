import { inject, injectable } from 'inversify';
import { symbols } from '../../container/symbols';
import Database from '../Database';

@injectable()
export default abstract class BaseRepository<T> {
  constructor(@inject(symbols.Database) protected db: Database) {}

  abstract list(): Promise<T[]>;
  abstract details(id: number): Promise<T | null>;
  abstract update(dto: Partial<T>): Promise<T | null>;
  abstract create(dto: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<T | null>;
}
