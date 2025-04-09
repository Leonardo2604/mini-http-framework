import { describe, expect, it, vi } from 'vitest';
import { NodeHttpServer } from './node-server';
import { Router } from '@/lib/http';

describe.sequential('NodeHttpServer', () => {
  it('should be able to create a server', () => {
    const router = new Router();
    const fakeMiddleware = async () => {};

    const server = new NodeHttpServer({
      port: 3000,
      host: 'localhost',
      router,
    });

    server.use(fakeMiddleware);

    expect(server).toBeInstanceOf(NodeHttpServer);
    expect(server.port).toBe(3000);
    expect(server.router).toBe(router);
    expect(server.middlewares).toContain(fakeMiddleware);
  });

  it('should be able to start a server', async () => {
    const router = new Router();

    router.get('/test', async (req, res) => {
      res.status(200).json({ message: 'Hello, world!' }).send();
    });

    const server = new NodeHttpServer({
      port: 3000,
      host: 'localhost',
      router,
    });

    await server.start();

    const request = await fetch(`http://${server.host}:${server.port}/test`);
    const data = await request.json();

    await server.stop();

    expect(data).toEqual({ message: 'Hello, world!' });
    expect(request.status).toBe(200);
    expect(request.statusText).toBe('OK');
    expect(request.headers.get('content-type')).toBe('application/json');
  });

  it('should return 404 when not found a route', async () => {
    const router = new Router();

    const server = new NodeHttpServer({
      port: 3000,
      host: 'localhost',
      router,
    });

    await server.start();

    const request = await fetch(`http://${server.host}:${server.port}/test`);
    const data = await request.json();

    await server.stop();

    expect(data).toEqual({ message: 'Not Found' });
    expect(request.status).toBe(404);
    expect(request.headers.get('content-type')).toBe('application/json');
  });

  it('should return 500 when handler broken', async () => {
    const router = new Router();

    router.get('/test', async () => {
      throw new Error('Handler broken');
    });

    const server = new NodeHttpServer({
      port: 3000,
      host: 'localhost',
      router,
    });

    await server.start();

    const request = await fetch(`http://${server.host}:${server.port}/test`);
    const data = await request.json();

    await server.stop();

    expect(data).toEqual({ message: 'Internal Server Error' });
    expect(request.status).toBe(500);
    expect(request.headers.get('content-type')).toBe('application/json');
  });

  it('should use custom error hendler when handler broken', async () => {
    const router = new Router();

    router.get('/test', async () => {
      throw new Error('Handler broken');
    });

    const server = new NodeHttpServer({
      port: 3000,
      host: 'localhost',
      router,
      errorHandler: async (req, res) => {
        res.status(500).json({ message: 'Custom error message' }).send();
      },
    });

    await server.start();

    const request = await fetch(`http://${server.host}:${server.port}/test`);
    const data = await request.json();

    await server.stop();

    expect(data).toEqual({ message: 'Custom error message' });
    expect(request.status).toBe(500);
    expect(request.headers.get('content-type')).toBe('application/json');
  });

  it('should reject stop when server.close returns an error', async () => {
    const mockClose = vi.fn((cb: (err?: Error) => void) => cb(new Error('close failed')));

    const server = new NodeHttpServer({ port: 3000, router: new Router() });

    // forçamos a instância ter um _server fake com .close mockado
    Object.defineProperty(server, '_server', {
      value: { close: mockClose },
      writable: true,
    });

    expect(server.host).toBe('localhost');
    await expect(server.stop()).rejects.toThrow('close failed');
    expect(mockClose).toHaveBeenCalled();
  });
});
