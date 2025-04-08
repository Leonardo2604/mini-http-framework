import { describe, expect, it } from 'vitest';
import { Router } from './router';
import { IncomingMessage } from 'node:http';

describe('Router', () => {
  it('should add routes to a router instance', () => {
    const router = new Router();

    router.get('/api/test', async () => {});
    router.post('/api/test', async () => {});
    router.put('/api/test', async () => {});
    router.patch('/api/test', async () => {});
    router.delete('/api/test', async () => {});

    expect(router.routes.length).toBe(5);
    expect(router.routes[0].method).toBe('GET');
    expect(router.routes[1].method).toBe('POST');
    expect(router.routes[2].method).toBe('PUT');
    expect(router.routes[3].method).toBe('PATCH');
    expect(router.routes[4].method).toBe('DELETE');
  });

  it('should match with routes added', () => {
    const router = new Router();

    router.get('/api/test', async () => {});

    expect(router.match({ method: 'GET', url: '/api/test' } as IncomingMessage)).not.toBeNull();
    expect(router.match({ method: 'POST', url: '/api/test' } as IncomingMessage)).toBeNull();
    expect(router.match({ method: 'GET', url: '/api/test/test' } as IncomingMessage)).toBeNull();
  });
});
