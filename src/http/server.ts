import { Router } from './router';

export type HttpServerOptions = {
  port: number;
  router: Router;
  host?: string;
};

export abstract class HttpServer {
  private readonly _port: number;
  private readonly _host: string;
  private readonly _router: Router;

  constructor(options: HttpServerOptions) {
    this._port = options.port;
    this._host = options.host || 'localhost';
    this._router = options.router;
  }

  get port(): number {
    return this._port;
  }

  get host(): string {
    return this._host;
  }

  get router(): Router {
    return this._router;
  }

  abstract start(): Promise<void>;

  abstract stop(): Promise<void>;
}
