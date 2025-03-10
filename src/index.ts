import { SERVER_PORT } from './config/env';
import { HttpServer, NodeHttpServer } from './http';
import { loggerMiddleware } from './middlewares/logger.middleware';

import { router } from './routers';

const server: HttpServer = new NodeHttpServer({
  port: SERVER_PORT,
  host: 'localhost',
  router,
});

server.use(loggerMiddleware);

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();
