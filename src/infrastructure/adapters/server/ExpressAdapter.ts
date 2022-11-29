import express, { Application, Request, Response } from "express";
import { TodoController } from "../../../application/controllers/TodoController";
import { IServer } from "../../../interfaces/IServer";
import { TodoControllerFactory } from "../../factories/TodoControllerFactory";
import { HttpRequest } from "../../helpers/HttpRequest";

export class ExpressAdapter implements IServer {
  private readonly todoController: TodoController = new TodoControllerFactory().create();
  private readonly app: Application = express();

  public async start(port: number): Promise<void> {
    this.app.get('/', async (req: Request, res: Response) => {
      const response = await this.todoController.findAllTodos(new HttpRequest(req));
      return res.status(response.statusCode).send(response);
    });

    await this.app.listen(port);
    console.log(`⭐️ Express Server listening on port ${port}`);
  }
}