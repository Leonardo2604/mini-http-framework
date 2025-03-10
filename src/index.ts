import { SERVER_PORT } from './config/env';
import { HttpServer, NodeHttpServer, Router } from './http';

const router = new Router();

router.get('/', async (req, res) => {
  res.send();
});

router.get('/users', async (req, res) => {
  res
    .status(200)
    .json([
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
    ])
    .send();
});

router.get('/users/:userId', async (req, res) => {
  res
    .status(200)
    .json({
      id: 1,
      name: 'John Doe',
    })
    .send();
});

const server: HttpServer = new NodeHttpServer({
  port: SERVER_PORT,
  host: 'localhost',
  router,
});

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();

process.on('SIGINT', async () => {
  await server.stop();
  console.log('Server stopped');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await server.stop();
  console.log('Server stopped');
  process.exit(0);
});
