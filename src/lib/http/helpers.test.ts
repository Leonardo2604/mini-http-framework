import { describe, it, expect } from 'vitest';
import { isHttpMethod } from './helpers';

describe('helpers', () => {
  it('isHttpMethod', () => {
    expect(isHttpMethod('GET')).toBe(true);
    expect(isHttpMethod('POST')).toBe(true);
    expect(isHttpMethod('PUT')).toBe(true);
    expect(isHttpMethod('DELETE')).toBe(true);
    expect(isHttpMethod('PATCH')).toBe(true);

    expect(isHttpMethod('INVALID')).toBe(false);
    expect(isHttpMethod('')).toBe(false);
  });
});
