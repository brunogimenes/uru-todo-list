import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';

import getListsService from '../services/get-lists.service';
import useGetLists from './use-get-lists';

vi.mock('../services/get-lists.service');

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);

describe('useGetLists', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should return data on success', async () => {
    const mockData = [{ id: '2', name: 'List 1' }, { id: '2', name: 'List 2' }];
    (getListsService as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetLists(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should return error on failure', async () => {
    const mockError = new Error('Failed to fetch lists');
    (getListsService as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetLists(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  });

  it('should set isLoading to true while fetching', async () => {
    (getListsService as Mock).mockReturnValue(new Promise(() => { }));

    const { result } = renderHook(() => useGetLists(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});