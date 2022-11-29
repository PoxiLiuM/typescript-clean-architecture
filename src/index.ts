import { ExpressAdapter } from "./infrastructure/adapters/server/ExpressAdapter"

const main = async () => {
  const server = new ExpressAdapter();

  await server.start(2503);
}

main();