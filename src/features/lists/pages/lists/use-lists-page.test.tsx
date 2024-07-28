import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';

import useGetLists from 'features/lists/hooks/use-get-lists';
import { ListModel } from 'features/lists/models/list.model';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useListsPage from './use-lists-page';

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
}));

vi.mock('features/lists/hooks/use-get-lists');

describe('useListsPage', () => {
  const mockNavigate = vi.fn();
  const mockList: ListModel = {
    id: '1',
    name: 'Test List',
    description: 'Test Description',
    color: '#FFFFFF',
    todos: [],
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useGetLists as Mock).mockReturnValue({ data: [mockList], isLoading: false });
    vi.clearAllMocks();
  });

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useListsPage(), { wrapper });

    expect(result.current.lists).toEqual([mockList]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.listBeingDeleted).toBe(null);
  });



  it('should set listBeingDeleted when onClickDeleteList is called', () => {
    const { result } = renderHook(() => useListsPage(), { wrapper });

    act(() => {
      result.current.onClickDeleteList(mockList);
    });

    expect(result.current.listBeingDeleted).toEqual(mockList);
  });

  it('should clear listBeingDeleted when onCancelDelete is called', () => {
    const { result } = renderHook(() => useListsPage(), { wrapper });

    act(() => {
      result.current.onClickDeleteList(mockList);
      result.current.onCancelDelete();
    });

    expect(result.current.listBeingDeleted).toBe(null);
  });

  it('should navigate to /lists/new when onClickAddList is called', () => {
    const { result } = renderHook(() => useListsPage(), { wrapper });

    act(() => {
      result.current.onClickAddList();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/lists/new');
  });
});
