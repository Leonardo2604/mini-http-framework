import { IncomingMessage } from 'http';
import { HttpHandler } from './handler';
import { Route } from './route';

export class Router {
  private _routes: Route[] = [];

  get(route: string, handler: HttpHandler) {
    this._routes.push(new Route('GET', route, handler));
  }

  post(route: string, handler: HttpHandler) {
    this._routes.push(new Route('POST', route, handler));
  }

  put(route: string, handler: HttpHandler) {
    this._routes.push(new Route('PUT', route, handler));
  }

  delete(route: string, handler: HttpHandler) {
    this._routes.push(new Route('DELETE', route, handler));
  }

  get routes() {
    return this._routes;
  }

  match(request: IncomingMessage) {
    const url = request.url || '/';
    const method = request.method || 'GET';

    const route = this._routes.find((r) => r.match(method, url));

    return route ?? null;
  }
}
