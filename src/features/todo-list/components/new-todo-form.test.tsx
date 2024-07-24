import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NewTodoForm from './new-todo-form';
import { todoItemModelValidations } from '../models/todo-item.model';
import { Mock } from 'vitest';
// import { todoItemModelValidations } from '../models/todo-item.model';



vi.mock('../models/todo-item.model', () => {
  return {
    todoItemModelValidations: {
      description: vi.fn(),
    }
  }
});

describe('NewTodoForm Component', () => {
  const _inputLabel = 'Description';
  const _buttonLabel = 'Add Todo';
  const _newTodoText = 'Hello, I am a new todo item';

  const onAdd = vi.fn();

  test('renders the form elements correctly', () => {
    const { getByLabelText, getByText } = render(<NewTodoForm onAdd={onAdd} />);

    expect(getByLabelText(_inputLabel)).toBeInTheDocument();
    expect(getByText(_buttonLabel)).toBeInTheDocument();
  });

  test('displays validation error when description is invalid', () => {
    (todoItemModelValidations.description as Mock).mockReturnValue({
      isValid: false,
      errors: ['Description is invalid'],
    });

    const { getByRole, queryByRole, getByLabelText } = render(<NewTodoForm onAdd={onAdd} />);
    expect(queryByRole('alert')).not.toBeInTheDocument();
    fireEvent.submit(getByLabelText(_buttonLabel));
    expect(getByRole('alert')).toBeInTheDocument();
  });

  test('do not display validation error when description is valid', () => {
    (todoItemModelValidations.description as Mock).mockReturnValue({
      isValid: true,
      errors: [],
    });

    const { queryByRole, getByText } = render(<NewTodoForm onAdd={onAdd} />);
    fireEvent.submit(getByText(_buttonLabel));
    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('calls onAdd with valid description', () => {
    (todoItemModelValidations.description as Mock).mockReturnValue({
      isValid: true,
      errors: [],
    });

    const { getByLabelText, queryByRole } = render(<NewTodoForm onAdd={onAdd} />);
    fireEvent.input(getByLabelText(_inputLabel), { target: { value: _newTodoText } });
    fireEvent.submit(getByLabelText(_buttonLabel));

    expect(onAdd).toHaveBeenCalledWith(_newTodoText);
    expect(queryByRole('alert')).not.toBeInTheDocument();
  });
});
