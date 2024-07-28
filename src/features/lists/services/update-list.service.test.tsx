import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MyFetch } from 'shared/http/my-fetch';
import updateListService from './update-list.service';
import { ListModel } from '../models/list.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      write: vi.fn(),
    },
  },
}));

describe('updateListService', () => {
  const mockList: ListModel = {
    id: '1',
    name: 'Updated Test List',
    description: 'Updated Test Description',
    color: '#FFFFFF',
    todos: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call MyFetch.instance.write with the correct parameters', async () => {
    (MyFetch.instance.write as Mock).mockResolvedValue(mockList);

    const result = await updateListService(mockList);

    expect(MyFetch.instance.write).toHaveBeenCalledWith('/api/lists/:id', {
      method: 'PUT',
      params: {
        id: mockList.id,
      },
      body: mockList,
    });
    expect(result).toEqual(mockList);
  });
});
