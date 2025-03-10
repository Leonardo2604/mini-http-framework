import { NextFunction } from './next-function';
import { HttpRequest } from './request';
import { HttpResponse } from './response';

export type Middleware = (request: HttpRequest, response: HttpResponse, next: NextFunction) => Promise<void>;
