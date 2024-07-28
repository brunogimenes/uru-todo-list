import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useGetTodos from './use-get-todos';
import getTodosService from '../services/get-todos.service';

vi.mock('../services/get-todos.service');

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

describe('useGetTodos', () => {
  const mockTodos = [
    { id: '1', description: 'Todo 1', isComplete: false },
    { id: '2', description: 'Todo 2', isComplete: true },
  ];

  it('should return todos and isLoading false on success', async () => {
    (getTodosService as Mock).mockResolvedValue(mockTodos);
    const { result } = renderHook(() => useGetTodos('1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return isLoading true while fetching', () => {
    (getTodosService as Mock).mockReturnValue(new Promise(() => { }));
    const { result } = renderHook(() => useGetTodos('1'), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.todos).toEqual([]);
  });

  it('should handle error state correctly', async () => {
    const mockError = new Error('Failed to fetch todos');
    (getTodosService as Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() => useGetTodos('1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.todos).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
