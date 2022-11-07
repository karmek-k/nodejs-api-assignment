export default interface ValidatorInterface<T> {
  validate(entity: Partial<T>): boolean;
}
