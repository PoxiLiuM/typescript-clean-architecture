import { Todo } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";
import { IUseCase } from "../../../infrastructure/interfaces";

export class FindAllTodosUseCase implements IUseCase {
  constructor(
    public readonly repository: TodoRepository
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(): Promise<Todo[]> {
    return await this.repository.find();
  }
}