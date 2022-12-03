import { Todo } from "../../../domain/entities/Todo";
import { TodoRepository } from "../../../domain/repositories/TodoRepository";
import { IUseCase } from "../../../interfaces/IUseCase";

export class FindAllTodosUseCase implements IUseCase {
  constructor(
    private readonly repository: TodoRepository
  ) {}

  async execute(): Promise<Todo[]> {
    return await this.repository.findAll();
  }
}