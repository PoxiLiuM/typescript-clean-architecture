import { FastifyAdapter, ExpressAdapter } from "./infrastructure/adapters/server";

const main = async () => {
  // const server = new ExpressAdapter();
  const server = new FastifyAdapter();

  await server.start(2503);
}

main();