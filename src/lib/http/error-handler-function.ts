import { HttpRequest } from './request';
import { HttpResponse } from './response';

export type ErrorHandlerFunction = (request: HttpRequest, response: HttpResponse, error: Error) => Promise<void>;
