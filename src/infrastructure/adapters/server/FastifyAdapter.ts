import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IServer } from "../../interfaces/IServer";
import { HttpRequest } from "../../helpers/HttpRequest";
import { useRouter } from "../../kernel/useRouter";

export class FastifyAdapter implements IServer {

  private readonly app: FastifyInstance = fastify();

  public async start(port: number): Promise<void> {
    this.app.register(require('@fastify/formbody'))

    const { router } = useRouter();

    router.forEach((route) => {
      (this.app as any)[route.method.toLowerCase() as string](route.path, async (request: FastifyRequest, reply: FastifyReply) => {
        const response = await route.handler(new HttpRequest(request));
        reply.status(response.statusCode);
        return response;
      });
    });

    this.app.listen({ port: 2503, host: '0.0.0.0' }, function (err) {
      if (err) {
        console.log(`❌ Fastify Server Error`, err);
        process.exit(1);
      }
      console.log(`⭐️ Fastify Server listening on port ${port}`);
    });
  }
}