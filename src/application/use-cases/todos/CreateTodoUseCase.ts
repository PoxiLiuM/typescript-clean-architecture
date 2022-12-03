import { Todo } from "../../../domain/entities/Todo";
import { TodoRepository } from "../../../domain/repositories/TodoRepository";
import { IUseCase } from "../../../interfaces/IUseCase";

export class CreateTodoUseCase implements IUseCase {
  constructor(
    private readonly repository: TodoRepository
  ) {}

  async execute(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return await await this.repository.create(todo);
  }
}