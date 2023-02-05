import { IDataBase, IRepository } from "../../infrastructure/interfaces";

export abstract class Repository<T> implements IRepository<T> {
  constructor(
    public readonly entityName: string,
    public readonly database: IDataBase
  ) {
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async find(data?: Partial<T>): Promise<T[]> {
    return await this.database.find<T>(this.entityName, data);
  }
  public async findOne(data?: Partial<T>): Promise<T | null> {
    return await this.database.findOne<T>(this.entityName, data);
  }
  public async findById(id: number): Promise<T | null> {
    return await this.database.findById<T>(this.entityName, id);
  }
  public async create(entity: T): Promise<T> {
    return await this.database.create<T>(this.entityName, entity);
  }
  public async update(id: number, entity: Partial<T>): Promise<boolean> {
    return await this.database.update<T>(this.entityName, id, entity);
  }
  public async delete(id: number): Promise<boolean> {
    return await this.database.delete<T>(this.entityName, id);
  }
}