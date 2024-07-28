import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';
import { ListModel } from 'features/lists/models/list.model';
import useListFormPage from './use-list-form-page';
import createListService from 'features/lists/services/create-list.service';
import updateListService from 'features/lists/services/update-list.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getListsService from 'features/lists/services/get-lists.service';

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

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('features/lists/services/get-lists.service');
vi.mock('features/lists/services/create-list.service');
vi.mock('features/lists/services/update-list.service');

describe('useListFormPage', () => {
  const mockNavigate = vi.fn();
  const mockListId = '1';
  const mockList: ListModel = {
    id: '1',
    name: 'Test List',
    description: 'Test Description',
    color: '#FFFFFF',
    todos: [],
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useParams as Mock).mockReturnValue({ listId: mockListId });
    (getListsService as Mock).mockResolvedValue([mockList]);
    vi.clearAllMocks();
  });

  it('should initialize with the correct list when in edit mode', async () => {
    const { result } = renderHook(() => useListFormPage(), { wrapper });

    await waitFor(() => {
      expect(result.current.list).toEqual(mockList);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should call createList when submitting a new list', async () => {
    (useParams as Mock).mockReturnValue({});
    const { result } = renderHook(() => useListFormPage(), { wrapper });

    act(() => {
      result.current.onListFormSubmit(mockList);
    });

    await waitFor(() => {
      expect(createListService).toBeCalledWith(mockList);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  it('should call editList when submitting an edited list', async () => {
    const { result } = renderHook(() => useListFormPage(), { wrapper });

    act(() => {
      result.current.onListFormSubmit(mockList);
    });

    await waitFor(() => {
      expect(updateListService).toBeCalledWith(mockList);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
