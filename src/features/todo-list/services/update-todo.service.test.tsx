import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import updateTodoService from './update-todo.service';
import { MyFetch } from 'shared/http/my-fetch';
import { TodoItemModel } from '../models/todo-item.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      write: vi.fn(),
    },
  },
}));

describe('updateTodoService', () => {
  const mockTodo: TodoItemModel = {
    id: '1',
    description: 'Updated Test Todo',
    isComplete: true,
  };
  const params = {
    listId: '1',
    todo: mockTodo,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update a todo successfully', async () => {
    (MyFetch.instance.write as Mock).mockResolvedValue(mockTodo);

    await updateTodoService(params);

    expect(MyFetch.instance.write).toHaveBeenCalledWith(`/api/lists/${params.listId}/todos/${mockTodo.id}`, {
      method: 'PATCH',
      body: mockTodo,
    });
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to update todo');
    (MyFetch.instance.write as Mock).mockRejectedValue(mockError);

    await expect(updateTodoService(params)).rejects.toThrow('Failed to update todo');
  });
});
