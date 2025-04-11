import { IncomingMessage } from 'node:http';
import { describe, expect, it } from 'vitest';
import { HttpRequest } from './request';
import { Route } from './route';

describe('HttpRequest', () => {
  it('should create an HttpRequest instance', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'GET',
      url: '/api/test?name=test',
      headers: { 'Content-Type': 'application/json' },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    // Create an instance of HttpRequest
    const request = await HttpRequest.create(mockRequest, mockRoute);

    // Assert the properties
    expect(request.method).toBe('GET');
    expect(request.url).toBe('/api/test?name=test');
    expect(request.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(request.query).toEqual({ name: 'test' });
    expect(request.params).toEqual({});
    expect(request.body).toBeUndefined();
    expect(request.raw).toBe(mockRequest);
    expect(request.extra).toEqual({});
  });

  it('should create an POST HttpRequest instance', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'POST',
      url: '/api/test',
      headers: { 'Content-Type': 'application/json' },
      [Symbol.asyncIterator]: async function* () {
        yield JSON.stringify({ name: 'test' });
      },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    // Create an instance of HttpRequest
    const request = await HttpRequest.create(mockRequest, mockRoute);

    // Assert the properties
    expect(request.method).toBe('POST');
    expect(request.body).toEqual({ name: 'test' });
  });

  it('should return body when invalid json body is provided', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'POST',
      url: '/api/test',
      headers: { 'Content-Type': 'application/json' },
      [Symbol.asyncIterator]: async function* () {
        yield 'not a json string';
      },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    // Create an instance of HttpRequest
    const request = await HttpRequest.create(mockRequest, mockRoute);

    // Assert the properties
    expect(request.method).toBe('POST');
    expect(request.body).toEqual('not a json string');
  });

  it('should use GET as default method when no method is provided', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      url: '/api/test',
      headers: { 'Content-Type': 'application/json' },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    const request = await HttpRequest.create(mockRequest, mockRoute);

    expect(request.method).toBe('GET');
  });

  it('should use / as default URL when no URL is provided', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    const request = await HttpRequest.create(mockRequest, mockRoute);

    expect(request.url).toBe('/');
  });

  it('should handle query parameters without values', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'GET',
      url: '/api/test?key1&key2=value2',
      headers: { 'Content-Type': 'application/json' },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    const request = await HttpRequest.create(mockRequest, mockRoute);

    expect(request.query).toEqual({
      key1: '',
      key2: 'value2'
    });
  });

  it('should throw an Error when invalid http method is provided', async () => {
    // Mock the IncomingMessage and Route
    const mockRequest = {
      method: 'INVALID_METHOD',
      url: '/api/test?name=test',
      headers: { 'Content-Type': 'application/json' },
    } as unknown as IncomingMessage;

    const mockRoute = {
      getParams: () => ({}),
    } as unknown as Route;

    await expect(async () => {
      await HttpRequest.create(mockRequest, mockRoute);
    }).rejects.toThrowError('Invalid HTTP method: INVALID_METHOD');
  });
});
