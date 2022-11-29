export interface IDataBase {
  find<T>(entityName: string): Promise<T[]>;
  create<T>(entityName: string, entity: Omit<T, '_id'>): Promise<T>;
}