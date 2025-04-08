import { describe, it, expect, vi } from 'vitest';
import { HttpResponse } from './response';
import { ServerResponse } from 'http';

const mockResponse = {
  writeHead: vi.fn(),
  write: vi.fn(),
  end: vi.fn(),
};

describe('HttpResponse', () => {
  it('should be able to send a json response', () => {
    const response = new HttpResponse(mockResponse as unknown as ServerResponse);
    const status = 200;
    const body = { message: 'Hello World!' };

    response.status(status).json(body).send();

    expect(mockResponse.writeHead).toHaveBeenCalledOnce();
    expect(mockResponse.writeHead).toHaveBeenCalledWith(status, { 'Content-Type': 'application/json' });
    expect(mockResponse.write).toHaveBeenCalledOnce();
    expect(mockResponse.write).toHaveBeenCalledWith(JSON.stringify(body));
    expect(mockResponse.end).toHaveBeenCalledOnce();
    expect(mockResponse.end).toHaveBeenCalledWith();
  });

  it('should set status code', () => {
    const response = new HttpResponse(mockResponse as unknown as ServerResponse);
    const status = 404;
    response.status(status).send();

    expect(mockResponse.writeHead).toHaveBeenCalledOnce();
    expect(mockResponse.writeHead).toHaveBeenCalledWith(status, { 'Content-Type': 'application/json' });
    expect(mockResponse.write).not.toHaveBeenCalled();
    expect(mockResponse.end).toHaveBeenCalledOnce();
  });

  it('should set a custom header', () => {
    const response = new HttpResponse(mockResponse as unknown as ServerResponse);
    response.setHeader('x-response-type', 'XXX').send();

    expect(mockResponse.writeHead).toHaveBeenCalledOnce();
    expect(mockResponse.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
      'x-response-type': 'XXX',
    });
  });

  it('should be able to get raw response', () => {
    const response = new HttpResponse(mockResponse as unknown as ServerResponse);
    expect(response.raw).toBe(mockResponse);
  });

  it('should not call write when body is not set', () => {
    const response = new HttpResponse(mockResponse as unknown as ServerResponse);

    response.status(204).send();

    expect(mockResponse.writeHead).toHaveBeenCalledOnce();
    expect(mockResponse.writeHead).toHaveBeenCalledWith(204, { 'Content-Type': 'application/json' });
    expect(mockResponse.write).not.toHaveBeenCalled();
    expect(mockResponse.end).toHaveBeenCalledOnce();
  });
});
