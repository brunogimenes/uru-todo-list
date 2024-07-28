import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';

import { ListModel, listModelValidateObject } from 'features/lists/models/list.model';
import { useNewListForm } from './use-new-list-form';

vi.mock('features/lists/models/list.model', () => ({
  listModelValidateObject: vi.fn(),
}));

describe('useNewListForm', () => {
  const initialList: ListModel = { id: '1', name: 'Initial List', description: 'Initial Description', todos: [] };
  const onConfirm = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with the provided initial list', () => {
    const { result } = renderHook(() => useNewListForm({ initialList, onConfirm }));

    expect(result.current.list).toEqual(initialList);
    expect(result.current.errors).toEqual({});
  });

  it('should update list state on handleInputChange', () => {
    const { result } = renderHook(() => useNewListForm({ initialList, onConfirm }));

    act(() => {
      result.current.handleInputChange({
        currentTarget: { name: 'name', value: 'Updated List' },
      } as React.FormEvent<HTMLInputElement>);
    });

    expect(result.current.list.name).toEqual('Updated List');
  });

  it('should set errors if validation fails on handleSubmit', () => {
    const mockValidation = { isValid: false, errors: { name: ['Name is required'] } };
    (listModelValidateObject as Mock).mockReturnValue(mockValidation);

    const { result } = renderHook(() => useNewListForm({ initialList, onConfirm }));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.errors).toEqual(mockValidation.errors);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm if validation passes on handleSubmit', () => {
    const mockValidation = { isValid: true, errors: {} };
    (listModelValidateObject as Mock).mockReturnValue(mockValidation);

    const { result } = renderHook(() => useNewListForm({ initialList, onConfirm }));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
    });

    expect(result.current.errors).toEqual({});
    expect(onConfirm).toHaveBeenCalledWith(initialList);
  });
});
