
import { render, fireEvent } from '@testing-library/react';
import { TodoItemModel } from '../models/todo-item.model';
import TodoItem from './todo-item';



describe('TodoItem Component', () => {
  const _fakeItemText = 'Fake Item Text';
  const _deleteButtonLabel = 'Delete Todo';
  const mockTodoItem: TodoItemModel = {
    id: '1',
    description: _fakeItemText,
    isComplete: false,
  };

  const onToggle = vi.fn();
  const onDelete = vi.fn();

  test('renders the todo item with description', () => {
    const { getByText } = render(
      <TodoItem todoItem={mockTodoItem} onToggle={onToggle} onDelete={onDelete} />
    );
    expect(getByText(_fakeItemText)).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    const todoItemElement = render(
      <TodoItem todoItem={mockTodoItem} onToggle={onToggle} onDelete={onDelete} />
    );
    const checkbox = todoItemElement.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(mockTodoItem.id);

  });

  test('calls onToggle when description is clicked', () => {
    const { getByText } = render(
      <TodoItem todoItem={mockTodoItem} onToggle={onToggle} onDelete={onDelete} />
    );
    fireEvent.click(getByText(_fakeItemText));
    expect(onToggle).toHaveBeenCalledWith(mockTodoItem.id);
  });

  test('calls onDelete when delete button is clicked', () => {
    const { getByLabelText } = render(
      <TodoItem todoItem={mockTodoItem} onToggle={onToggle} onDelete={onDelete} />
    );
    const button = getByLabelText(_deleteButtonLabel);
    fireEvent.click(button);
    expect(onDelete).toHaveBeenCalledWith(mockTodoItem.id);
  });

  test('applies the correct class when todo is complete', () => {
    const completedTodoItem = { ...mockTodoItem, isComplete: true };
    const { container } = render(
      <TodoItem todoItem={completedTodoItem} onToggle={onToggle} onDelete={onDelete} />
    );
    expect(container.firstChild).toHaveClass('line-through opacity-70');
  });
});
