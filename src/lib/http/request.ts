import { IncomingMessage } from 'node:http';
import { HttpMethod } from './method';
import { isHttpMethod } from './helpers';
import { Route } from './route';
import { once } from 'node:events';

export class HttpRequest {
  public extra: Record<string, unknown> = {};

  private constructor(
    private _method: HttpMethod,
    private _url: string,
    private _headers: IncomingMessage['headers'],
    private _query: Record<string, string | string[]>,
    private _params: Record<string, string>,
    private _body: unknown,
    private _raw: IncomingMessage,
  ) {}

  get method(): string {
    return this._method;
  }

  get url(): string {
    return this._url;
  }

  get headers(): IncomingMessage['headers'] {
    return this._headers;
  }

  get query(): Record<string, string | string[]> {
    return this._query;
  }

  get params(): Record<string, string> {
    return this._params;
  }

  get body(): unknown {
    return this._body;
  }

  get raw(): IncomingMessage {
    return this._raw;
  }

  static async create(request: IncomingMessage, route: Route): Promise<HttpRequest> {
    const body = await HttpRequest.getBody(request);
    const url = HttpRequest.getUrl(request);

    return new HttpRequest(
      HttpRequest.getMethod(request),
      url,
      request.headers,
      HttpRequest.getQueryParams(request),
      route.getParams(url),
      body,
      request,
    );
  }

  private static getMethod(request: IncomingMessage): HttpMethod {
    const method = request.method?.toUpperCase() || 'GET';

    if (!isHttpMethod(method)) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }

    return method;
  }

  private static getUrl(request: IncomingMessage): string {
    return request.url || '/';
  }

  private static async getBody(request: IncomingMessage): Promise<unknown> {
    if (!['POST', 'PUT', 'PATCH'].includes(HttpRequest.getMethod(request))) {
      return;
    }

    let body: string;

    try {
      body = (await once(request, 'data')).toString();
    } catch (err) {
      return;
    }

    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }

  private static getQueryParams(request: IncomingMessage): Record<string, string> {
    const queryParams: Record<string, string> = {};

    const queryString = HttpRequest.getUrl(request).split('?')[1];

    if (queryString) {
      queryString.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        queryParams[key] = decodeURIComponent(value || '');
      });
    }

    return queryParams;
  }
}
