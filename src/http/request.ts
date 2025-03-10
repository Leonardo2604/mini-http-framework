import { IncomingMessage } from 'node:http';
import { HttpMethod } from './method';
import { isHttpMethod } from './helpers/method';

export class HttpRequest {
  private constructor(
    private _method: HttpMethod,
    private _url: string,
    private _headers: IncomingMessage['headers'],
    private _query: Record<string, string | string[]>,
    private _params: Record<string, string>,
    private _body: unknown,
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

  static async create(request: IncomingMessage): Promise<HttpRequest> {
    const body = await HttpRequest.getBody(request);

    return new HttpRequest(
      HttpRequest.getMethod(request),
      HttpRequest.getUrl(request),
      request.headers,
      HttpRequest.getQueryParams(request),
      {},
      body,
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

    let body = '';

    for await (const chunk of request) {
      body += chunk;
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

  private static getParams(route: string, url: string): Record<string, string> {
    const params: Record<string, string> = {};
    const routeParts = route.split('/');
    const urlParts = url.split('?')[0].split('/');

    if (routeParts.length !== urlParts.length) return params;

    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = urlParts[index];
      }
    });

    return params;
  }
}
