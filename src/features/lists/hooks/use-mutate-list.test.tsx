import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';

import createListService from '../services/create-list.service';
import updateListService from '../services/update-list.service';
import deleteListService from '../services/delete-list.service';
import useMutateLists from './use-mutate-list';
import { ListModel } from '../models/list.model';

vi.mock('../services/create-list.service');
vi.mock('../services/update-list.service');
vi.mock('../services/delete-list.service');

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

describe('useMutateLists', () => {

  const mockedList: ListModel = {
    id: '1',
    name: 'List 1',
    color: 'blue',
    description: 'List 1 description',
    todos: []
  }

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should create a list successfully', async () => {
    const mockResponse = { id: '1', name: 'List 1' };
    (createListService as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMutateLists(), { wrapper });

    result.current.createList(mockedList);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(createListService).toHaveBeenCalledWith(mockedList);
  });

  it('should edit a list successfully', async () => {
    const mockResponse = { id: '1', name: 'Updated List' };
    (updateListService as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMutateLists(), { wrapper });

    result.current.editList(mockedList);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(updateListService).toHaveBeenCalledWith(mockedList);
  });

  it('should delete a list successfully', async () => {
    const mockResponse = { id: '1' };
    (deleteListService as Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMutateLists(), { wrapper });

    result.current.deleteList('1');

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(deleteListService).toHaveBeenCalledWith('1');
  });

  it('should set isLoading to true while a mutation is pending', async () => {
    (createListService as Mock).mockReturnValue(new Promise(() => { }));

    const { result } = renderHook(() => useMutateLists(), { wrapper });

    result.current.createList(mockedList);

    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });
});
