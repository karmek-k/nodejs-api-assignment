export default interface RepositoryInterface<T> {
  list(): T[];
  details(): T;
  update(dto: Partial<T>): T;
  create(dto: Partial<T>): T;
  delete(id: number): T;
}
