import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';

import useListPage from './use-list-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ListPage from './list.page';

vi.mock('./use-list-page');


const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('ListPage', () => {
  const mockUseListPage = {
    list: { name: 'Test List', description: 'Test Description' },
    todos: [],
    onAddTodo: vi.fn(),
    onRemoveTodo: vi.fn(),
    onUpdateTodo: vi.fn(),
    isAddingTodo: false,
    setIsAddingTodo: vi.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    (useListPage as Mock).mockReturnValue(mockUseListPage);
  });

  it('should render list details and todo list', () => {
    render(<ListPage />, { wrapper });

    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should open modal to add todo when button is clicked', () => {
    render(<ListPage />, { wrapper });

    fireEvent.click(screen.getByText('Add Todo'));

    expect(mockUseListPage.setIsAddingTodo).toHaveBeenCalledWith(true);
  });

  it('should show loading spinner when isLoading is true', () => {
    (useListPage as Mock).mockReturnValue({ ...mockUseListPage, isLoading: true });

    render(<ListPage />, { wrapper });

    expect(screen.getByLabelText('loader')).toBeInTheDocument();
  });

  it('should not render when list is null', () => {
    (useListPage as Mock).mockReturnValue({ ...mockUseListPage, list: null });

    const { container } = render(<ListPage />, { wrapper });

    expect(container.firstChild).toBeNull();
  });
});
