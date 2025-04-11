import { ErrorHandlerFunction } from './error-handler-function';
import { Middleware } from './middleware';
import { Router } from './router';

export type HttpServerOptions = {
  port?: number;
  router: Router;
  host?: string;
  errorHandler?: ErrorHandlerFunction;
};

export abstract class HttpServer {
  protected _port: number;
  private readonly _host: string;
  private readonly _router: Router;
  private readonly _middlewares: Middleware[] = [];
  private _errorHandler: ErrorHandlerFunction | undefined;

  constructor(options: HttpServerOptions) {
    this._port = options.port || 0;
    this._host = options.host || 'localhost';
    this._router = options.router;
    this._errorHandler = options.errorHandler;
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

  get middlewares(): Middleware[] {
    return this._middlewares;
  }

  get errorHandler(): ErrorHandlerFunction | undefined {
    return this._errorHandler;
  }

  use(middleware: Middleware) {
    this._middlewares.push(middleware);
  }

  protected set port(port: number) {
    this._port = port;
  }

  abstract start(): Promise<void>;

  abstract stop(): Promise<void>;
}
