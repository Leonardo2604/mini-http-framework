import { SERVER_PORT, SERVER_HOST } from './config/env';
import { errorHandler } from './config/error-handler';
import { HttpServer, NodeHttpServer } from './lib/http';
import { cors } from './modules/shared/middlewares/cors.middleware';
import { securityHeaders } from './modules/shared/middlewares/security-headers.middleware';

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
