import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { HttpServer, HttpServerOptions } from '../server';
import { HttpRequest } from '../request';
import { HttpResponse } from '../response';

export class NodeHttpServer extends HttpServer {
  private readonly _server: Server;

  constructor(options: HttpServerOptions) {
    super(options);
    this._server = createServer(this.handle.bind(this));
  }

  async start(): Promise<void> {
    return new Promise((resolve) => this._server.listen(this.port, this.host, resolve));
  }

  async stop(): Promise<void> {
    return new Promise<void>((resolve, reject) =>
      this._server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }),
    );
  }

  private async handle(nodeRequest: IncomingMessage, nodeResponse: ServerResponse) {
    const route = this.router.match(nodeRequest);
    const response = new HttpResponse(nodeResponse);

    if (!route) {
      response.status(404).json({ message: 'Not Found' }).send();
      return;
    }

    const request = await HttpRequest.create(nodeRequest, route);

    const middlewares = [...this.middlewares, route.handler];

    try {
      let index = 0;

      const next = async () => {
        if (index < middlewares.length) {
          const middleware = middlewares[index++];

          await middleware(request, response, next);
        }
      };

      await next();
    } catch {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
