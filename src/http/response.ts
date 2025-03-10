import { ServerResponse } from 'node:http';

export class HttpResponse {
  private _statusCode: number = 200;
  private _headers: Record<string, string> = { 'Content-Type': 'application/json' };
  private _body: unknown = null;

  constructor(private readonly _response: ServerResponse) {}

  get raw() {
    return this._response;
  }

  status(code: number) {
    this._statusCode = code;

    return this;
  }

  header(key: string, value: string) {
    this._headers[key] = value;

    return this;
  }

  json(body: unknown) {
    this._body = JSON.stringify(body);

    return this;
  }

  send() {
    this._response.writeHead(this._statusCode, this._headers);

    if (this._body) {
      this._response.write(this._body);
    }

    this._response.end();
  }
}
