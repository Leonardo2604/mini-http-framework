import { HttpRequest } from './request';
import { HttpResponse } from './response';

export type HttpHandler = (request: HttpRequest, response: HttpResponse) => Promise<void>;
