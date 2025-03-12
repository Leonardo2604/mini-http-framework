import { server } from '@/http';

(async () => {
  await server.start();
  console.log(`Server running on http://${server.host}:${server.port}`);
})();
