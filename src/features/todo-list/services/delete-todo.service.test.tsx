import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import deleteTodoService from './delete-todo.service';
import { MyFetch } from 'shared/http/my-fetch';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      delete: vi.fn(),
    },
  },
}));

describe('deleteTodoService', () => {
  const params = {
    listId: '1',
    todoId: '1',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete a todo successfully', async () => {
    (MyFetch.instance.delete as Mock).mockResolvedValue({});

    await deleteTodoService(params);

    expect(MyFetch.instance.delete).toHaveBeenCalledWith('/api/lists/:listId/todos/:todoId', {
      listId: '1',
      todoId: '1',
    });
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Failed to delete todo');
    (MyFetch.instance.delete as Mock).mockRejectedValue(mockError);

    await expect(deleteTodoService(params)).rejects.toThrow('Failed to delete todo');
  });
});
