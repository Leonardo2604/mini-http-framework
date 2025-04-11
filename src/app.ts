import { server } from '@/infra/http';

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();
