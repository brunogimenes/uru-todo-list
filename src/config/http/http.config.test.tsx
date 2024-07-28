import { describe, it, expect } from 'vitest';
import { httpConfig, queryClient } from './http.config';


describe('queryClientConfig', () => {
  it('should have a baseURL', () => {
    expect(httpConfig.baseURL).not.toBeUndefined();
  });

  it('should create a queryClient with the correct default options', () => {
    const testQueryClient = queryClient;

    expect(testQueryClient.getDefaultOptions().queries).not.toBeUndefined();

  });
});
