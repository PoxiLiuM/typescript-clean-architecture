import { Todo } from "../../../domain/entities/Todo";
import { IRepository } from "../../../interfaces/IRepository";
import { IUseCase } from "../../../interfaces/IUseCase";

export class CreateTodoUseCase implements IUseCase {
  readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async execute(todo: Omit<Todo, '_id'>): Promise<Todo> {
    return await await this.repository.create(todo);
  }
}