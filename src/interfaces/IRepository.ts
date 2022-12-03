export interface IRepository<T> {
  findAll(): Promise<T[]>;
  create(entity: Omit<T, '_id'>): Promise<T>;
}