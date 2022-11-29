import { TodoController } from "../../application/controllers/TodoController";
import { FindAllTodosUseCase } from "../../application/use-cases/todos/FindAllTodosUseCase";
import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { IController } from "../../interfaces/IController";
import { IControllerFactory } from "../../interfaces/IFactory";
import { InMemoryAdapter } from "../adapters/database/InMemoryAdapter";

export class TodoControllerFactory implements IControllerFactory {
  public create(): TodoController {
    const database = new InMemoryAdapter();
    const repository = new TodoRepository(database);
    const useCases = {
      findAllTodosUseCase: new FindAllTodosUseCase(repository)
    };
    return new TodoController(useCases);
  }
  
}