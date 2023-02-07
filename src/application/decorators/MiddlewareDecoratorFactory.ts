import { IMiddleware } from "../../infrastructure/interfaces/IMiddleware";

export const MiddlewareDecoratorFactory = (middleware: IMiddleware) => () => (target: any, key: string, descriptor: any) => {
  if (!target.middlewares)
    target.middlewares = [];

  if (!descriptor) {
    target.middlewares.push({ key, handler: middleware.handler });
  } else {
    target.middlewares.push({ handler: middleware.handler });
  }
}