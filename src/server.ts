import { SERVER_PORT } from './config/env';
import { HttpServer, NodeHttpServer } from './lib/http';
import { cors } from './modules/shared/middlewares/cors.middleware';
import { securityHeaders } from './modules/shared/middlewares/security-headers.middleware';

import { router } from './router';

const server: HttpServer = new NodeHttpServer({
  port: SERVER_PORT,
  host: 'localhost',
  router,
});

server.use(securityHeaders);
server.use(cors());

export { server };
