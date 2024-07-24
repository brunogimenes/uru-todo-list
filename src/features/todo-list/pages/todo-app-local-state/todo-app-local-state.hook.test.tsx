
import { vi } from 'vitest';
import useTodoAppLocalStatePage from './todo-app-local-state.hook';
import { act, renderHook } from '@testing-library/react';


vi.mock('../../utils/todo-utils', () => ({
  generateTodoId: vi.fn((description: string) => `generated-id-${description}`),
}));

describe('useTodoAppLocalStatePage Hook', () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  test('should initialize with correct default values', () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    expect(result.current.todos).toEqual([]);
    expect(result.current.isAdding).toBe(false);
    expect(result.current.filterType).toBe('all');
    expect(result.current.filteredTodos).toEqual([]);
  });

  test('should set isAdding to true when onShowAddTodo is called', () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    act(() => {
      result.current.onShowAddTodo();
    });

    expect(result.current.isAdding).toBe(true);
  });

  test('should add a new todo when onAddTodo is called', () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    act(() => {
      result.current.onAddTodo('New Todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]).toEqual({
      id: 'generated-id-New Todo',
      description: 'New Todo',
      isComplete: false,
    });
    expect(result.current.isAdding).toBe(false);
  });

  test('should delete a todo when onDeleteTodo is called', () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    act(() => {
      result.current.onAddTodo('Todo to Delete');
    });

    act(() => {
      result.current.onDeleteTodo('generated-id-Todo to Delete');
    });

    expect(result.current.todos).toHaveLength(0);
  });

  test('should toggle a todo when onToggleTodo is called', () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    act(() => {
      result.current.onAddTodo('Todo to Toggle');
    });

    act(() => {
      result.current.onToggleTodo('generated-id-Todo to Toggle');
    });

    expect(result.current.todos[0].isComplete).toBe(true);

    act(() => {
      result.current.onToggleTodo('generated-id-Todo to Toggle');
    });

    expect(result.current.todos[0].isComplete).toBe(false);
  });

  test('should filter todos correctly based on filterType', async () => {
    const { result } = renderHook(() => useTodoAppLocalStatePage());

    act(() => {
      result.current.setFilterType('all');
      result.current.onAddTodo('Completed Todo');
      result.current.onAddTodo('Pending Todo');
      result.current.onAddTodo('Another Pending Todo');
    });

    expect(result.current.filteredTodos).toHaveLength(3);

    act(() => {
      result.current.setFilterType('completed');
      result.current.onToggleTodo('generated-id-Completed Todo');
    });

    expect(result.current.filteredTodos).toHaveLength(1);

    act(() => {
      result.current.setFilterType('pending');
    });

    expect(result.current.filteredTodos).toHaveLength(2);
  });
});
