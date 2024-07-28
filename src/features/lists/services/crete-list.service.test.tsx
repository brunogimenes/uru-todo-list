import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MyFetch } from 'shared/http/my-fetch';
import createListService from './create-list.service';
import { ListModel } from '../models/list.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      write: vi.fn(),
    },
  },
}));

describe('createListService', () => {
  const mockList: ListModel = {
    id: '1',
    name: 'Test List',
    description: 'Test Description',
    color: '#FFFFFF',
    todos: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call MyFetch.instance.write with the correct parameters', async () => {
    (MyFetch.instance.write as Mock).mockResolvedValue(mockList);

    const result = await createListService(mockList);

    expect(MyFetch.instance.write).toHaveBeenCalledWith('/api/lists', {
      method: 'POST',
      body: mockList,
    });
    expect(result).toEqual(mockList);
  });
});
