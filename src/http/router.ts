import { IncomingMessage } from 'http';
import { HttpHandler } from './handler';
import { Route } from './route';

export class Router {
  private _routes: Route[] = [];

  get(route: string, handler: HttpHandler) {
    this._routes.push({ method: 'GET', route, handler });
  }

  post(route: string, handler: HttpHandler) {
    this._routes.push({ method: 'POST', route, handler });
  }

  put(route: string, handler: HttpHandler) {
    this._routes.push({ method: 'PUT', route, handler });
  }

  delete(route: string, handler: HttpHandler) {
    this._routes.push({ method: 'DELETE', route, handler });
  }

  get routes() {
    return this._routes;
  }

  match(request: IncomingMessage) {
    return this._routes.find((r) => r.method === request.method && r.route === request.url) ?? null;
  }
}
