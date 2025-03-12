import { HttpMethod } from '../method';

export function isHttpMethod(method: string): method is HttpMethod {
  return ['GET', 'POST', 'PUT', 'DELETE'].includes(method);
}
