import { IncomingMessage } from 'http';
import { HttpHandler } from './handler';
import { Route, RouteOptions } from './route';

export class Router {
  private _routes: Route[] = [];

  get(route: string, handler: HttpHandler, options?: RouteOptions) {
    this._routes.push(new Route('GET', route, handler, options));
  }

  post(route: string, handler: HttpHandler, options?: RouteOptions) {
    this._routes.push(new Route('POST', route, handler, options));
  }

  put(route: string, handler: HttpHandler, options?: RouteOptions) {
    this._routes.push(new Route('PUT', route, handler, options));
  }

  delete(route: string, handler: HttpHandler, options?: RouteOptions) {
    this._routes.push(new Route('DELETE', route, handler, options));
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
