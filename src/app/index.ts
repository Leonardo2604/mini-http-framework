import { SERVER_PORT } from './config/env';
import { HttpServer, NodeHttpServer } from '../lib/http';
import { cors } from './middlewares/cors.middleware';
import { securityHeaders } from './middlewares/security-headers.middleware';

import { router } from './routers';

const server: HttpServer = new NodeHttpServer({
  port: SERVER_PORT,
  host: 'localhost',
  router,
});

server.use(securityHeaders);
server.use(cors());

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();
