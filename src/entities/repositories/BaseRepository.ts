import { injectable } from 'inversify';

@injectable()
export default abstract class BaseRepository<T> {
  abstract list(): Promise<T[]>;
  abstract details(id: number): Promise<T | null>;
  abstract update(dto: Partial<T>): Promise<T | null>;
  abstract create(dto: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<T | null>;
}
