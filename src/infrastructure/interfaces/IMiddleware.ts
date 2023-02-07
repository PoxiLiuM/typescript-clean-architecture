import { HttpRequest } from "../helpers";

export interface IMiddleware {
  handler(httpRequest?: HttpRequest): Promise<void>
}