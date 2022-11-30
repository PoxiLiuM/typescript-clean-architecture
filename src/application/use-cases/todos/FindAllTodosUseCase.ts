import { Todo } from "../../../domain/entities/Todo";
import { IRepository } from "../../../interfaces/IRepository";
import { IUseCase } from "../../../interfaces/IUseCase";

export class FindAllTodosUseCase implements IUseCase {
  readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Todo[]> {
    return await this.repository.findAll();
  }
}