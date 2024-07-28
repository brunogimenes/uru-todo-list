import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import useListsPage from './use-lists-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ListsPage from './lists.page';
import { BrowserRouter as Router } from 'react-router-dom';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <Router>
      {children}
    </Router>
  </QueryClientProvider>
);

vi.mock('./use-lists-page');

describe('ListsPage', () => {
  const mockList = {
    id: '1',
    name: 'Test List',
    description: 'Test Description',
    color: '#FFFFFF',
    todos: [],
  };

  const mockUseListsPage = {
    lists: [mockList],
    isLoading: false,
    onClickAddList: vi.fn(),
    listBeingDeleted: null,
    onCancelDelete: vi.fn(),
    onClickDeleteList: vi.fn(),
  };

  beforeEach(() => {
    (useListsPage as Mock).mockReturnValue(mockUseListsPage);
    vi.clearAllMocks();
  });

  it('should render the lists', () => {
    render(<ListsPage />, { wrapper });

    expect(screen.getByText('📋 Lists')).toBeInTheDocument();
    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should show EmptyState when no lists are found', () => {
    (useListsPage as Mock).mockReturnValue({ ...mockUseListsPage, lists: [] });

    render(<ListsPage />, { wrapper });

    expect(screen.getByText('No lists found')).toBeInTheDocument();
  });

  it('should call onClickAddList when Add List button is clicked', () => {
    render(<ListsPage />, { wrapper });

    fireEvent.click(screen.getByLabelText('Add List'));

    expect(mockUseListsPage.onClickAddList).toHaveBeenCalled();
  });

  it('should call onClickDeleteList when delete button is clicked', () => {
    render(<ListsPage />, { wrapper });

    fireEvent.click(screen.getByText('🗑️'));

    expect(mockUseListsPage.onClickDeleteList).toHaveBeenCalledWith(mockList);
  });

  it('should show DeleteListDialog when listBeingDeleted is set', () => {
    (useListsPage as Mock).mockReturnValue({ ...mockUseListsPage, listBeingDeleted: mockList });

    render(<ListsPage />, { wrapper });

    expect(screen.getByLabelText(`Delete List`)).toBeInTheDocument();
  });

  it('should show FixedSpinner when isLoading is true', () => {
    (useListsPage as Mock).mockReturnValue({ ...mockUseListsPage, isLoading: true });

    render(<ListsPage />, { wrapper });

    expect(screen.getByLabelText("loader")).toBeInTheDocument();
  });
});
