
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemModel } from '../models/todo-item.model';
import TodoList from './todo-list';

describe('TodoList Component', () => {

  const _emptyStateMessage = 'No todos found';
  const _deleteButtonLabel = 'Delete';

  const mockTodoList: TodoItemModel[] = [
    { id: '1', description: 'Test Todo Item 1', isComplete: false },
    { id: '2', description: 'Test Todo Item 2', isComplete: true },
  ];

  const onToggle = vi.fn();
  const onDelete = vi.fn();

  test('renders empty state when no todos are present', () => {
    const { getByText } = render(
      <TodoList todoList={[]} onToggle={onToggle} onDelete={onDelete} />
    );
    expect(getByText(_emptyStateMessage)).toBeInTheDocument();
  });

  test('renders the list of todos', () => {
    const { getByText } = render(
      <TodoList todoList={mockTodoList} onToggle={onToggle} onDelete={onDelete} />
    );
    expect(getByText(mockTodoList[0].description)).toBeInTheDocument();
    expect(getByText(mockTodoList[1].description)).toBeInTheDocument();
  });

  test('calls onToggle when a todo item is toggled', () => {
    const { getByText } = render(
      <TodoList todoList={mockTodoList} onToggle={onToggle} onDelete={onDelete} />
    );
    fireEvent.click(getByText(mockTodoList[0].description));
    expect(onToggle).toHaveBeenCalledWith(mockTodoList[0].id);
  });

  test('calls onDelete when a todo item is deleted', () => {
    const { getAllByLabelText } = render(
      <TodoList todoList={mockTodoList} onToggle={onToggle} onDelete={onDelete} />
    );
    const deleteButtons = getAllByLabelText(_deleteButtonLabel);
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(mockTodoList[0].id);
  });

});