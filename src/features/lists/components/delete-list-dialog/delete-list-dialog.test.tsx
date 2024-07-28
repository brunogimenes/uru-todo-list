import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { ListModel } from '../../models/list.model';
import DeleteListDialog from './delete-list-dialog';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import deleteListService from '../../services/delete-list.service';

vi.mock('../services/delete-list.service');

describe('DeleteListDialog', () => {
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

  const list: ListModel = { id: '1', name: 'Test List', description: 'Description', todos: [] };
  const onAfterDelete = vi.fn();
  const onCancel = vi.fn();

  it('should render correctly', () => {
    render(<DeleteListDialog list={list} onAfterDelete={onAfterDelete} onCancel={onCancel} />, { wrapper });
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call deleteList and onAfterDelete on confirm', async () => {
    (deleteListService as Mock).mockResolvedValue(undefined);

    render(<DeleteListDialog list={list} onAfterDelete={onAfterDelete} onCancel={onCancel} />, { wrapper });

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(deleteListService).toHaveBeenCalledWith(list.id));
    expect(onAfterDelete).toHaveBeenCalled();
  });

  it('should call onCancel on cancel', () => {
    render(<DeleteListDialog list={list} onAfterDelete={onAfterDelete} onCancel={onCancel} />, { wrapper });

    fireEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalled();
  });
});
