import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import getTodosService from './get-todos.service';
import { MyFetch } from 'shared/http/my-fetch';
import { TodoItemModel } from '../models/todo-item.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      read: vi.fn(),
    },
  },
}));

describe('getTodosService', () => {
  const mockTodos: TodoItemModel[] = [
    { id: '1', description: 'Test Todo 1', isComplete: false },
    { id: '2', description: 'Test Todo 2', isComplete: false },
  ];
  const listId = '1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get todos successfully', async () => {
    (MyFetch.instance.read as Mock).mockResolvedValue(mockTodos);

    const result = await getTodosService(listId);

    expect(MyFetch.instance.read).toHaveBeenCalledWith('/api/lists/:listId/todos', { listId });
    expect(result).toEqual(mockTodos);
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to get todos');
    (MyFetch.instance.read as Mock).mockRejectedValue(mockError);

    await expect(getTodosService(listId)).rejects.toThrow('Failed to get todos');
  });
});
