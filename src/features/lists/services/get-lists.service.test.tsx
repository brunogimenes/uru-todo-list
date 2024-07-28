import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MyFetch } from 'shared/http/my-fetch';
import getListsService from './get-lists.service';
import { ListModel } from '../models/list.model';

vi.mock('shared/http/my-fetch', () => ({
  MyFetch: {
    instance: {
      read: vi.fn(),
    },
  },
}));

describe('getListsService', () => {
  const mockLists: ListModel[] = [
    {
      id: '1',
      name: 'Test List 1',
      description: 'Test Description 1',
      color: '#FFFFFF',
      todos: [],
    },
    {
      id: '2',
      name: 'Test List 2',
      description: 'Test Description 2',
      color: '#000000',
      todos: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call MyFetch.instance.read and return the correct data', async () => {
    (MyFetch.instance.read as Mock).mockResolvedValue(mockLists);

    const result = await getListsService();

    expect(MyFetch.instance.read).toHaveBeenCalledWith('/api/lists');
    expect(result).toEqual(mockLists);
  });
});
