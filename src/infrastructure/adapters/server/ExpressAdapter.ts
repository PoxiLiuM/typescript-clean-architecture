import express, { Application, Request, Response } from "express";
import { IServer } from "../../interfaces/IServer";
import { HttpRequest } from "../../helpers/HttpRequest";
import { useRouter } from "../../kernel/useRouter";
import { HttpInternalServerErrorResponse } from "../../helpers";

export class ExpressAdapter implements IServer {

  private readonly app: Application = express();

  public async start(port: number): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const { router } = useRouter();

    router.forEach((route) => {
      (this.app as any)[route.method.toLowerCase() as string](route.path, async (req: Request, res: Response) => {
        try {
          const httpRequest = new HttpRequest({
            path: route.path, 
            body: req.body, 
            query: req.query
          });
          for (const middleware of route.middlewares) {
            await middleware(httpRequest);
          }
          const response = await route.handler(httpRequest);
          return res.status(response.statusCode).send(response)
        } catch (e: any) {
          if (!e.statusCode) {
            const error = new HttpInternalServerErrorResponse(e);
            return res.status(error.statusCode).send(error);
          }
          return res.status(e.statusCode).send(e);
        }
      
      });
    });

    this.app.listen(port);
    console.log(`⭐️ Express Server listening on port ${port}`);
  }
}