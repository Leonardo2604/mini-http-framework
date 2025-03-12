import { HttpHandler } from './handler';
import { HttpMethod } from './method';

export class Route {
  private _method: HttpMethod;
  private _route: string;
  private _handler: HttpHandler;
  private _regex: RegExp;
  private _paramNames: string[];

  constructor(method: HttpMethod, route: string, handler: HttpHandler) {
    this._method = method;
    this._route = route;
    this._handler = handler;
    this._regex = new RegExp(`^${route.replace(/:[a-zA-Z0-9_]+/g, '([^/]+)')}\\/?$`);
    this._paramNames = route.match(/:([a-zA-Z0-9_]+)/g)?.map((param) => param.substring(1)) || [];
  }

  get method(): HttpMethod {
    return this._method;
  }

  get route(): string {
    return this._route;
  }

  get handler(): HttpHandler {
    return this._handler;
  }

  match(method: string, url: string): boolean {
    if (this.method !== method) {
      return false;
    }

    return this._regex.test(url);
  }

  getParams(url: string) {
    const matches = url.match(this._regex);

    const params: Record<string, string> = {};

    if (matches) {
      this._paramNames.forEach((param, index) => {
        params[param] = matches[index + 1];
      });
    }

    return params;
  }
}
