import express, { Application, Request, Response } from "express";
import { TodoController } from "../../../application/controllers/TodoController";
import { IServer } from "../../interfaces/IServer";
import { HttpRequest } from "../../helpers/HttpRequest";
import { useRouter } from "../../kernel/useRouter";

export class ExpressAdapter implements IServer {

  private readonly app: Application = express();

  public async start(port: number): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const { router } = useRouter();

    router.forEach((route) => {
      (this.app as any)[route.method.toLowerCase() as string](route.path, async (req: Request, res: Response) => {
        const response = await route.handler(new HttpRequest(req));
        return res.status(response.statusCode).send(response);
      });
    });

    await this.app.listen(port);
    console.log(`⭐️ Express Server listening on port ${port}`);
  }
}