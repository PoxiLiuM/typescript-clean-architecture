import { useTodoController } from "./useTodoController";

function makeKernel() {
  const { todoController } = useTodoController();

  return () => ({
    todoController
  });
}

export const useKernel = makeKernel();