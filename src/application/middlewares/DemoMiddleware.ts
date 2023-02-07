import { HttpRequest } from "../../infrastructure/helpers";
import { IMiddleware } from "../../infrastructure/interfaces";
import { MiddlewareDecoratorFactory } from "../decorators";

class Middleware implements IMiddleware {
  constructor(){
    this.handler = this.handler.bind(this);
  }

  public async handler(httpRequest: HttpRequest) {
    console.log(`DemoMiddleware called on path: ${httpRequest.path}`);
  }
}

function useMiddleware() {
  return new Middleware();
}

export const DemoMiddleware = MiddlewareDecoratorFactory(useMiddleware());