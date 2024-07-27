import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { TodoItemModel } from '../models/todo-item.model';
import TodoList from './todo-list';

describe('TodoList', () => {
  const mockTodoList: TodoItemModel[] = [
    { id: '1', description: 'Test Todo 1', isComplete: false },
    { id: '2', description: 'Test Todo 2', isComplete: true },
  ];

  const onUpdateTodoMock = vi.fn();
  const onDeleteMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the todo list with items', () => {
    render(<TodoList todoList={mockTodoList} onUpdateTodo={onUpdateTodoMock} onDelete={onDeleteMock} />);

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('should call onUpdateTodo when toggling a todo item', () => {
    render(<TodoList todoList={mockTodoList} onUpdateTodo={onUpdateTodoMock} onDelete={onDeleteMock} />);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(onUpdateTodoMock).toHaveBeenCalledWith({
      ...mockTodoList[0],
      isComplete: true,
    });
  });

  it('should call onDelete when deleting a todo item', () => {
    render(<TodoList todoList={mockTodoList} onUpdateTodo={onUpdateTodoMock} onDelete={onDeleteMock} />);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith(mockTodoList[0].id);
  });

  it('should display empty state when there are no todos', () => {
    render(<TodoList todoList={[]} onUpdateTodo={onUpdateTodoMock} onDelete={onDeleteMock} />);

    expect(screen.getByText('No todos found')).toBeInTheDocument();
  });
});
