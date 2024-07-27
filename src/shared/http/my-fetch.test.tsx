import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { MyFetch } from './my-fetch';

describe('MyFetch', () => {
  beforeEach(() => {
    (globalThis.fetch as Mock) = vi.fn();
    MyFetch.createInstance({ baseURL: 'http://localhost/' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should build the correct URL with params', () => {
    const url = '/api/items/:id';
    const params = { id: 123 };
    const builtUrl = MyFetch.buildUrl(url, params);
    expect(builtUrl).toBe('http://localhost/api/items/123');
  });

  it('should make a GET request and return data', async () => {
    const url = '/api/items';
    const mockResponse = { items: ['item1', 'item2'] };

    (globalThis.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const myFetch = MyFetch.instance;
    const data = await myFetch.read(url);

    expect(data).toEqual(mockResponse);
    expect((globalThis.fetch as Mock)).toHaveBeenCalledWith('http://localhost/api/items');
  });

  it('should make a POST request with body data', async () => {
    const url = '/api/items';
    const mockRequestBody = { name: 'NewItem' };
    const mockResponse = { id: 1, name: 'NewItem' };

    (globalThis.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const myFetch = MyFetch.instance;
    const data = await myFetch.write(url, { method: 'POST', body: mockRequestBody });

    expect(data).toEqual(mockResponse);
    expect((globalThis.fetch as Mock)).toHaveBeenCalledWith('http://localhost/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequestBody),
    });
  });

  it('should make a PATCH request with body data', async () => {
    const url = '/api/items/1';
    const mockRequestBody = { name: 'UpdatedItem' };
    const mockResponse = { id: 1, name: 'UpdatedItem' };

    (globalThis.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    const myFetch = MyFetch.instance;
    const data = await myFetch.write(url, { method: 'PATCH', body: mockRequestBody });

    expect(data).toEqual(mockResponse);
    expect((globalThis.fetch as Mock)).toHaveBeenCalledWith('http://localhost/api/items/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockRequestBody),
    });
  });

  it('should make a DELETE request', async () => {
    const url = '/api/items/1';

    (globalThis.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const myFetch = MyFetch.instance;
    const data = await myFetch.write(url, { method: 'DELETE' });

    expect(data).toEqual({});
    expect((globalThis.fetch as Mock)).toHaveBeenCalledWith('http://localhost/api/items/1', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
  });
});
