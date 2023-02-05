import { TodoController } from "../../application/controllers";
import { CreateTodoUseCase, FindAllTodosUseCase } from "../../application/use-cases/todos";
import { TodoRepository } from "../../domain/repositories";
import { InMemoryAdapter } from "../adapters/database";

function makeKernel() {
  const database = new InMemoryAdapter();

  const todoRepository = new TodoRepository(database);

  const createTodoUseCase = new CreateTodoUseCase(todoRepository);
  const findAllTodosUseCase = new FindAllTodosUseCase(todoRepository);

  const todoController = new TodoController(
    createTodoUseCase,
    findAllTodosUseCase
  );

  return () => ({
    database,
    repositories: {
      todoRepository
    },
    useCases: {
      todos: {
        createTodoUseCase,
        findAllTodosUseCase
      }
    },
    controllers: {
      todoController
    }
  } as any);
}

export const useKernel = makeKernel();