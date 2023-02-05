import { IDataBase } from "./IDataBase";

export interface IRepository<T> {
  entityName: string;
  database: IDataBase;

  find(data: Partial<T>): Promise<T[]>
  findOne(data: Partial<T>): Promise<T | null>
  findById(id: number): Promise<T | null>
  create(entity: T): Promise<T>
  update(id: number, entity: Partial<T>): Promise<boolean>
  delete(id: number): Promise<boolean>
}