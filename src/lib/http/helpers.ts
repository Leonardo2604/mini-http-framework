import { HttpMethod } from './method';

export function isHttpMethod(method: string): method is HttpMethod {
  return ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
}
