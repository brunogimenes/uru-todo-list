
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import useGetList from './use-get-list';
import useGetLists from './use-get-lists';
import queryClientProviderWrapper from 'shared/utils/tests/query-client-provider-wrapper';
import { renderHook } from '@testing-library/react';

vi.mock('./use-get-lists');

describe('useGetList', () => {
  const mockLists = [
    { id: '1', name: 'List 1', description: 'Description 1', color: '#FFFFFF', todos: [] },
    { id: '2', name: 'List 2', description: 'Description 2', color: '#000000', todos: [] }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useGetLists as Mock).mockReturnValue({ data: mockLists });
  });

  it('should return the correct list based on listId', () => {
    const listId = '1';
    const { result } = renderHook(() => useGetList(listId), { wrapper: queryClientProviderWrapper });

    expect(result.current).toEqual(mockLists[0]);
  });

  it('should return undefined if the listId does not exist', () => {
    const listId = '3';
    const { result } = renderHook(() => useGetList(listId), { wrapper: queryClientProviderWrapper });

    expect(result.current).toBeUndefined();
  });

  it('should update the returned list when the listId changes', () => {
    let listId = '1';
    const { result, rerender } = renderHook(() => useGetList(listId), { wrapper: queryClientProviderWrapper });

    expect(result.current).toEqual(mockLists[0]);

    listId = '2';
    rerender();

    expect(result.current).toEqual(mockLists[1]);
  });
});
