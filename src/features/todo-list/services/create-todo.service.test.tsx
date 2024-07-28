import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import createTodoService from './create-todo.service';
import { MyFetch } from 'shared/http/my-fetch';
import { TodoItemModel } from '../models/todo-item.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      write: vi.fn(),
    },
  },
}));

describe('createTodoService', () => {
  const mockTodo: Omit<TodoItemModel, 'id'> = {
    description: 'Test Todo',
    isComplete: false,
  };
  const mockResponse: TodoItemModel = {
    id: '1',
    description: 'Test Todo',
    isComplete: false,
  };
  const params = {
    listId: '1',
    todo: mockTodo,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a todo successfully', async () => {
    (MyFetch.instance.write as Mock).mockResolvedValue(mockResponse);

    const result = await createTodoService(params);

    expect(MyFetch.instance.write).toHaveBeenCalledWith('/api/lists/:listId/todos', {
      method: 'POST',
      body: mockTodo,
      params: {
        listId: '1',
      },
    });

    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to create todo');
    (MyFetch.instance.write as Mock).mockRejectedValue(mockError);

    await expect(createTodoService(params)).rejects.toThrow('Failed to create todo');
  });
});
