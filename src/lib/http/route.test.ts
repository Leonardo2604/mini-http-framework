import { describe, expect, it } from 'vitest';
import { Route } from './route';
import { Middleware } from './middleware';

describe('Route', () => {
  it('should create a route instance', () => {
    // Mock the route parameters
    const method = 'GET';
    const route = '/api/test/:id';
    const handler = async () => {};
    const middlewares: Middleware[] = [];

    // Create a new Route instance
    const routeInstance = new Route(method, route, handler, {
      middlewares,
    });

    // Assert the properties
    expect(routeInstance.method).toBe(method);
    expect(routeInstance.route).toBe(route);
    expect(routeInstance.handler).toBe(handler);
    expect(routeInstance.middlewares).toEqual(middlewares);
    expect(routeInstance.match(method, route)).toBe(true);
    expect(routeInstance.match('POST', route)).toBe(false);
    expect(routeInstance.match(method, '/api/test/123')).toBe(true);
    expect(routeInstance.match(method, '/api/test/abc')).toBe(true);
    expect(routeInstance.match(method, '/api/test/')).toBe(false);
    expect(routeInstance.match(method, '/api/test/123/extra')).toBe(false);
    expect(routeInstance.getParams('/api/test/123')).toEqual({ id: '123' });
    expect(routeInstance.getParams('/api/test/abc')).toEqual({ id: 'abc' });
  });

  it('should return empty params when no match is found', () => {
    const method = 'GET';
    const route = '/api/test/:id';
    const handler = async () => {};
    const middlewares: Middleware[] = [];

    // Create a new Route instance
    const routeInstance = new Route(method, route, handler, {
      middlewares,
    });

    // Assert the properties
    expect(routeInstance.getParams('/api/test/')).toEqual({});
    expect(routeInstance.getParams('/api/test/123/extra')).toEqual({});
  });

  it('should extract multiple params', () => {
    const method = 'GET';
    const route = '/api/user/:userId/post/:postId';
    const handler = async () => {};

    const routeInstance = new Route(method, route, handler, { middlewares: [] });

    expect(routeInstance.match(method, '/api/user/42/post/99')).toBe(true);
    expect(routeInstance.getParams('/api/user/42/post/99')).toEqual({
      userId: '42',
      postId: '99',
    });

    expect(routeInstance.match(method, '/api/user/42/post')).toBe(false);
    expect(routeInstance.getParams('/api/user/42/post')).toEqual({});
  });
});
