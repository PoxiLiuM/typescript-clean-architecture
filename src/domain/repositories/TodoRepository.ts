import { IDataBase } from "../../interfaces/IDataBase";
import { IRepository } from "../../interfaces/IRepository";
import { Todo } from "../entities/Todo";

export class TodoRepository implements IRepository<Todo> {
  constructor(
    private readonly database: IDataBase
  ){}

  async findAll(): Promise<Todo[]> {
    return await this.database.find<Todo>('todos');
  }
  async create(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return await this.database.create<Todo>('todos', todo);
  }
}