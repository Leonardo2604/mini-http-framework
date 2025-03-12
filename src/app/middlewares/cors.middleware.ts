import { Middleware } from '../../lib/http/middleware';

export type CorsOptions = {
  origin?: string;
  methods?: string[];
  allowedHeaders?: string[];
};

export const cors = (options?: CorsOptions): Middleware => {
  const origin = options?.origin || '*';
  const methods = options?.methods || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
  const allowedHeaders = options?.allowedHeaders || ['Content-Type', 'Authorization'];

  return async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', allowedHeaders.join(', '));

    await next();
  };
};
