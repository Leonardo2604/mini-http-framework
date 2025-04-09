import { describe, it, expect, vi } from 'vitest';
import { InfoController } from './info.controller';
import { HttpRequest, HttpResponse } from '@/lib/http';
import { ServerResponse } from 'http';

describe('InfoController', () => {
  it('should return framework info with correct headers and status', async () => {
    const mockResponse = {
      writeHead: vi.fn(),
      write: vi.fn(),
      end: vi.fn(),
    } as unknown as ServerResponse;

    const request = {
      method: 'GET',
      url: '/',
      headers: {},
      query: {},
      params: {},
      body: null,
      extra: {},
    } as HttpRequest;

    const controller = new InfoController();
    const response = new HttpResponse(mockResponse);

    await controller.handle(request, response);

    // Verifica se os métodos foram chamados
    expect(mockResponse.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
    });

    // Verifica o conteúdo enviado
    expect(mockResponse.write).toHaveBeenCalledWith(
      JSON.stringify({
        name: 'Mini HTTP Framework',
        version: '1.0.0',
      }),
    );

    // Verifica se a resposta foi finalizada
    expect(mockResponse.end).toHaveBeenCalled();
  });
});
