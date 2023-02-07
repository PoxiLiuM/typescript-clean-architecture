import { InMemoryAdapter } from "../adapters/database";

function makeDataBase() {
  const database = new InMemoryAdapter();

  return () => ({
    database
  });
}

export const useDataBase = makeDataBase();