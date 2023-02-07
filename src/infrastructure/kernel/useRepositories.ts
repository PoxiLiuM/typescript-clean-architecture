import { TodoRepository } from "../../domain/repositories";
import { useDataBase } from "./useDataBase";

function makeRepositories() {
  const { database } = useDataBase();

  const todoRepository = new TodoRepository(database);

  return () => ({
    todoRepository
  });
}

export const useRepositories = makeRepositories();