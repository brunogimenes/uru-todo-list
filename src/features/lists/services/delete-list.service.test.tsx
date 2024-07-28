import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MyFetch } from 'shared/http/my-fetch';
import deleteListService from './delete-list.service';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      delete: vi.fn(),
    },
  },
}));

describe('deleteListService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call MyFetch.instance.delete with the correct parameters', async () => {
    const listId = '1';
    (MyFetch.instance.delete as Mock).mockResolvedValue({});

    await deleteListService(listId);

    expect(MyFetch.instance.delete).toHaveBeenCalledWith('/api/lists/:id', {
      id: listId,
    });
  });
});
