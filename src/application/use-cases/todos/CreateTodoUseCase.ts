import { Todo } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";
import { IUseCase } from "../../../infrastructure/interfaces";

export class CreateTodoUseCase implements IUseCase {
  constructor(
    public readonly repository: TodoRepository
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return await await this.repository.create(todo);
  }
}