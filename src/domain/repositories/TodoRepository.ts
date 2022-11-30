import { IDataBase } from "../../interfaces/IDataBase";
import { IRepository } from "../../interfaces/IRepository";

export class TodoRepository implements IRepository {
  constructor(
    private readonly database: IDataBase
  ){}

  async findAll<Todo>(): Promise<Todo[]> {
    return await this.database.find('todos');
  }
  async create<Todo>(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return await this.database.create('todos', todo);
  }
}