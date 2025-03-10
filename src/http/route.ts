import { HttpHandler } from './handler';
import { HttpMethod } from './method';

export type Route = {
  method: HttpMethod;
  route: string;
  handler: HttpHandler;
};
