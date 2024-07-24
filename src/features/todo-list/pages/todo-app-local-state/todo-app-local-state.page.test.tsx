
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Mock, vi } from 'vitest';
import useTodoAppLocalStatePage from './todo-app-local-state.hook';
import TodoAppLocalState from './todo-app-local-state.page';

vi.mock('./todo-app-local-state.hook');

describe('TodoAppLocalState Component', () => {
  const mockHookReturn = {
    isAdding: false,
    onShowAddTodo: vi.fn(),
    onAddTodo: vi.fn(),
    onDeleteTodo: vi.fn(),
    onToggleTodo: vi.fn(),
    setIsAdding: vi.fn(),
    filterType: 'all',
    setFilterType: vi.fn(),
    filteredTodos: [
      { id: '1', description: 'Test Todo 1', isComplete: false },
      { id: '2', description: 'Test Todo 2', isComplete: true }
    ],
  };

  (useTodoAppLocalStatePage as Mock).mockReturnValue(mockHookReturn);

  test('renders correctly', () => {
    render(<TodoAppLocalState />);

    expect(screen.getByText('☑️ Todo App Local State')).toBeInTheDocument();
    expect(screen.getByText('Filter your list')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('calls onShowAddTodo when Add Todo button is clicked', () => {
    render(<TodoAppLocalState />);

    fireEvent.click(screen.getByText('Add Todo'));
    expect(mockHookReturn.onShowAddTodo).toHaveBeenCalled();
  });

  test('calls setFilterType when filter is changed', () => {
    render(<TodoAppLocalState />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completed' } });
    expect(mockHookReturn.setFilterType).toHaveBeenCalledWith('completed');
  });

  test('calls onToggleTodo when a todo is toggled', () => {
    render(<TodoAppLocalState />);

    fireEvent.click(screen.getByText('Test Todo 1'));
    expect(mockHookReturn.onToggleTodo).toHaveBeenCalledWith('1');
  });

  test('calls onDeleteTodo when a todo delete button is clicked', () => {
    render(<TodoAppLocalState />);

    fireEvent.click(screen.getAllByLabelText('Delete')[0]);
    expect(mockHookReturn.onDeleteTodo).toHaveBeenCalledWith('1');
  });

  test('opens modal when isAdding is true', () => {
    (useTodoAppLocalStatePage as Mock).mockReturnValue({
      ...mockHookReturn,
      isAdding: true,
    });

    render(<TodoAppLocalState />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

});
