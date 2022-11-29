export interface IRepository {
  findAll<T>(): Promise<T[]>;
  create<T>(entity: Omit<T, '_id'>): Promise<T>;
}