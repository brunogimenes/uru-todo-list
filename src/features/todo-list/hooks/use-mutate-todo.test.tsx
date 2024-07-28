import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import useMutateTodo from './use-mutate-todo';
import createTodoService from '../services/create-todo.service';
import updateTodoService from '../services/update-todo.service';
import deleteTodoService from '../services/delete-todo.service';
import queryClientProviderWrapper from 'shared/utils/tests/query-client-provider-wrapper';

vi.mock('../services/create-todo.service');
vi.mock('../services/update-todo.service');
vi.mock('../services/delete-todo.service');

describe('useMutateTodo', () => {
  const mockTodo = { id: '1', description: 'Test Todo', isComplete: false };
  const mockRequest = { listId: '1', todo: mockTodo };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a todo', async () => {
    (createTodoService as Mock).mockResolvedValue({
      listId: '1',
      todo: mockTodo
    });
    const { result } = renderHook(() => useMutateTodo(), { wrapper: queryClientProviderWrapper });

    await act(async () => {
      await result.current.createTodo(mockRequest);
    });

    expect(createTodoService).toHaveBeenCalledWith(mockRequest);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should edit a todo', async () => {
    (updateTodoService as Mock).mockResolvedValue(mockTodo);
    const { result } = renderHook(() => useMutateTodo(), { wrapper: queryClientProviderWrapper });

    await act(async () => {
      await result.current.editTodo(mockRequest);
    });

    expect(updateTodoService).toHaveBeenCalledWith(mockRequest);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should delete a todo', async () => {
    (deleteTodoService as Mock).mockResolvedValue(mockTodo.id);
    const { result } = renderHook(() => useMutateTodo(), { wrapper: queryClientProviderWrapper });
    const mockDeleteRequest = {
      listId: mockRequest.listId,
      todoId: mockRequest.todo.id,
    };
    await act(async () => {
      await result.current.deleteTodo(mockDeleteRequest);
    });

    expect(deleteTodoService).toHaveBeenCalledWith(mockDeleteRequest);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should set isLoading correctly during mutations', async () => {
    (createTodoService as Mock).mockReturnValue(new Promise(() => { }));
    const { result } = renderHook(() => useMutateTodo(), { wrapper: queryClientProviderWrapper });

    act(() => {
      result.current.createTodo(mockRequest);
    });

    console.log(result.current)

    await waitFor(() => expect(result.current.isLoading).toBe(true));

  });
});
