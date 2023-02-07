import { TodoController } from "../../application/controllers";
import { CreateTodoUseCase, FindAllTodosUseCase } from "../../application/use-cases/todos";
import { useRepositories } from "./useRepositories";

function makeTodoController() {
  const { todoRepository } = useRepositories();

  const todoController = new TodoController(
    new CreateTodoUseCase(todoRepository),
    new FindAllTodosUseCase(todoRepository)
  );

  return () => ({ todoController });
}

export const useTodoController = makeTodoController();