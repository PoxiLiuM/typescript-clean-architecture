import { IDataBase } from "../../../interfaces/IDataBase";

export class InMemoryAdapter implements IDataBase {
  private readonly db: any = {};
  private readonly dbCounter: any = {};

  public async create<T>(entityName: string, entity: Omit<T, '_id'>): Promise<T> {
    if (!this.db[entityName])
      this.db[entityName] = [];
    if (!this.dbCounter[entityName])
      this.dbCounter[entityName] = 1;

    const _id: number = this.dbCounter[entityName];

    const addedValue = { ...entity, _id };
    this.db[entityName].push(addedValue);
    this.dbCounter[entityName]++;
    
    return addedValue as T;
  }

  public async find<T>(entityName: string): Promise<T[]> {
    if (!this.db[entityName])
      this.db[entityName] = [];
      
    return this.db[entityName] as T[];
  }
}