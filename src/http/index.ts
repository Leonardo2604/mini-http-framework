import { HttpServer } from '@/lib/http';
import { NodeHttpServer } from './node/node-server';
import { SERVER_HOST, SERVER_PORT } from '@/config/env';

import { errorHandler } from './config/error-handler';

import { securityHeaders } from './middlewares/security-headers.middleware';
import { cors } from './middlewares/cors.middleware';

import { router } from './router';

const server: HttpServer = new NodeHttpServer({
  port: SERVER_PORT,
  host: SERVER_HOST,
  router,
  errorHandler,
});

server.use(securityHeaders);
server.use(cors());

export { server };
