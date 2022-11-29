import { Todo } from "../../../domain/entities/Todo";
import { IRepository } from "../../../interfaces/IRepository";
import { IUseCase } from "../../../interfaces/IUseCase";

export class FindAllTodosUseCase implements IUseCase {
  readonly repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async execute(opts?: object): Promise<object[]> {
    const todo = new Todo({ title: 'Test', content: 'Ceci est un test' });
    await this.repository.create(todo);
    return await this.repository.findAll();
  }
}