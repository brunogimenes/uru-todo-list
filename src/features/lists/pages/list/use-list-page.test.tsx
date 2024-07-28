import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useParams } from 'react-router-dom';
import useMutateTodo from 'features/todo-list/hooks/use-mutate-todo';
import useGetList from 'features/lists/hooks/use-get-list';
import useGetTodos from 'features/todo-list/hooks/use-get-todos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useListPage from './use-list-page';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('features/todo-list/hooks/use-mutate-todo');
vi.mock('features/lists/hooks/use-get-list');
vi.mock('features/todo-list/hooks/use-get-todos');

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

describe('useListPage', () => {
  const mockListId = '1';
  const mockList = { id: '1', name: 'Test List', description: 'Test Description' };
  const mockTodos = [{ id: '1', description: 'Test Todo', isComplete: false }];

  beforeEach(() => {
    (useParams as Mock).mockReturnValue({ listId: mockListId });
    (useGetList as Mock).mockReturnValue(mockList);
    (useGetTodos as Mock).mockReturnValue({ todos: mockTodos, isLoading: false });
    (useMutateTodo as Mock).mockReturnValue({
      createTodo: vi.fn(),
      deleteTodo: vi.fn(),
      editTodo: vi.fn(),
      isLoading: false,
    });
  });

  it('should return initial state correctly', () => {
    const { result } = renderHook(() => useListPage(), { wrapper });

    expect(result.current.list).toEqual(mockList);
    expect(result.current.todos).toEqual(mockTodos);
    expect(result.current.isAddingTodo).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle adding a todo', () => {
    const createTodo = vi.fn();
    (useMutateTodo as Mock).mockReturnValue({
      createTodo,
      deleteTodo: vi.fn(),
      editTodo: vi.fn(),
      isLoading: false,
    });

    const { result } = renderHook(() => useListPage(), { wrapper });

    act(() => {
      result.current.onAddTodo('New Todo');
    });

    expect(createTodo).toHaveBeenCalledWith({
      listId: mockList.id,
      todo: {
        description: 'New Todo',
        isComplete: false,
      },
    });
    expect(result.current.isAddingTodo).toBe(false);
  });

  it('should handle updating a todo', () => {
    const editTodo = vi.fn();
    (useMutateTodo as Mock).mockReturnValue({
      createTodo: vi.fn(),
      deleteTodo: vi.fn(),
      editTodo,
      isLoading: false,
    });

    const { result } = renderHook(() => useListPage(), { wrapper });

    act(() => {
      result.current.onUpdateTodo({
        id: '1',
        description: 'Updated Todo',
        isComplete: false,
      });
    });

    expect(editTodo).toHaveBeenCalledWith({
      listId: mockList.id,
      todo: {
        id: '1',
        description: 'Updated Todo',
        isComplete: false,
      },
    });
  });

  it('should handle removing a todo', () => {
    const deleteTodo = vi.fn();
    (useMutateTodo as Mock).mockReturnValue({
      createTodo: vi.fn(),
      deleteTodo,
      editTodo: vi.fn(),
      isLoading: false,
    });

    const { result } = renderHook(() => useListPage(), { wrapper });

    act(() => {
      result.current.onRemoveTodo('1');
    });

    expect(deleteTodo).toHaveBeenCalledWith({
      listId: mockList.id,
      todoId: '1',
    });
  });

  it('should set isLoading to true when either get or mutate is loading', () => {
    (useGetTodos as Mock).mockReturnValue({ todos: mockTodos, isLoading: true });
    const { result } = renderHook(() => useListPage(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });

  it('should set isLoading to true when mutate is loading', () => {
    (useMutateTodo as Mock).mockReturnValue({
      createTodo: vi.fn(),
      deleteTodo: vi.fn(),
      editTodo: vi.fn(),
      isLoading: true,
    });

    const { result } = renderHook(() => useListPage(), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });
});
