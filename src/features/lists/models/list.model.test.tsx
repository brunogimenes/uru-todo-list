import { describe, it, expect } from 'vitest';

import { ValidationModel } from 'shared/models/validation-model';
import { ListModel, listModelValidateObject } from './list.model';

describe('listModel', () => {
  it('should validate a valid list model', () => {
    const list: ListModel = {
      id: '1',
      name: 'Valid List',
      description: 'This is a valid list description.',
      color: '#FFFFFF',
      todos: []
    };

    const result: ValidationModel = listModelValidateObject(list);

    expect(result.isValid).toBe(true);
    expect(result.errors.name).toHaveLength(0);
    expect(result.errors.description).toHaveLength(0);
  });

  it('should invalidate a list model with no name', () => {
    const list: ListModel = {
      id: '1',
      name: '',
      description: 'This is a valid list description.',
      color: '#FFFFFF',
      todos: []
    };

    const result: ValidationModel = listModelValidateObject(list);

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain('Name is required');
  });

  it('should invalidate a list model with no description', () => {
    const list: ListModel = {
      id: '1',
      name: 'Valid List',
      description: '',
      color: '#FFFFFF',
      todos: []
    };

    const result: ValidationModel = listModelValidateObject(list);

    expect(result.isValid).toBe(false);
    expect(result.errors.description).toContain('Description is required');
  });

  it('should invalidate a list model with no name and no description', () => {
    const list: ListModel = {
      id: '1',
      name: '',
      description: '',
      color: '#FFFFFF',
      todos: []
    };

    const result: ValidationModel = listModelValidateObject(list);

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain('Name is required');
    expect(result.errors.description).toContain('Description is required');
  });
});
