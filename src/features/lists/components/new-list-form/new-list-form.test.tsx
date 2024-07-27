import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Mock, vi } from 'vitest';
import NewListForm from './new-list-form';
import { useNewListForm } from './use-new-list-form';
import { ListModel } from 'features/lists/models/list.model';


vi.mock('./use-new-list-form');

describe('NewListForm Component', () => {
  const mockHookReturn = {
    list: {
      name: '',
      description: '',
      color: '',
    },
    errors: {},
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn((e) => {
      e.preventDefault();
      // Simulando a chamada de onConfirm com os dados do formulário
      onConfirm({
        id: '',
        name: 'Test List',
        description: 'This is a test list',
        color: '#ff0000',
      });
    }),
  };

  (useNewListForm as Mock).mockReturnValue(mockHookReturn);

  const onConfirm = vi.fn();

  const initialList: ListModel = {
    id: '',
    name: '',
    description: '',
    color: '',
    todos: []
  };

  test('renders the form elements correctly', () => {
    render(<NewListForm initialList={initialList} onConfirm={onConfirm} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Color')).toBeInTheDocument();
    expect(screen.getByText('Create List')).toBeInTheDocument();
  });

  test('calls handleSubmit when form is submitted', () => {
    render(<NewListForm initialList={initialList} onConfirm={onConfirm} />);

    fireEvent.submit(screen.getByText('Create List'));
    expect(mockHookReturn.handleSubmit).toHaveBeenCalled();
  });

  test('displays validation error when name fields are invalid', () => {
    (useNewListForm as Mock).mockReturnValue({
      ...mockHookReturn,
      errors: { name: ['Name is required'] },
    });

    const { getByText } = render(<NewListForm initialList={initialList} onConfirm={onConfirm} />);

    fireEvent.submit(screen.getByText('Create List'));

    expect(getByText('Name is required')).toBeInTheDocument();
  });

  test('displays validation error when description fields are invalid', () => {
    (useNewListForm as Mock).mockReturnValue({
      ...mockHookReturn,
      errors: { name: ['Description is required'] },
    });

    const { getByText } = render(<NewListForm initialList={initialList} onConfirm={onConfirm} />);

    fireEvent.submit(screen.getByText('Create List'));

    expect(getByText('Description is required')).toBeInTheDocument();
  });

  test('calls onConfirm with valid data when the form is submitted', () => {
    (useNewListForm as Mock).mockReturnValue({
      ...mockHookReturn,
      list: {
        name: 'Test List',
        description: 'This is a test list',
        color: '#ff0000',
      },
      errors: {},
    });

    render(<NewListForm initialList={initialList} onConfirm={onConfirm} />);

    fireEvent.input(screen.getByLabelText('Name'), { target: { value: 'Test List' } });
    fireEvent.input(screen.getByLabelText('Description'), { target: { value: 'This is a test list' } });
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#ff0000' } });

    fireEvent.submit(screen.getByText('Create List'));

    expect(onConfirm).toHaveBeenCalledWith({
      id: '',
      name: 'Test List',
      description: 'This is a test list',
      color: '#ff0000',
    });
  });

  test('renders the edit button text when initialList has an id', () => {
    const initialListWithId: ListModel = {
      id: '1',
      name: 'Test List',
      description: 'This is a test list',
      color: '#ff0000',
      todos: []
    };

    render(<NewListForm initialList={initialListWithId} onConfirm={onConfirm} />);

    expect(screen.getByText('Edit List')).toBeInTheDocument();
  });
});
