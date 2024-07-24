import { todoItemModelValidations } from './todo-item.model';
import { ValidationModel } from '../../../shared/models/validation-model';

describe('TodoItemModel Validations', () => {
  const validDescription = 'I am so valid 🙂';
  const shortDescription = 'aa';
  const longDescription = 'a'.repeat(101);

  test('returns valid for a correct description', () => {
    const result: ValidationModel = todoItemModelValidations.description(validDescription);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('returns invalid when description is empty', () => {
    const result: ValidationModel = todoItemModelValidations.description('');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description is required');
  });

  test('returns invalid when description is too short', () => {
    const result: ValidationModel = todoItemModelValidations.description(shortDescription);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description must be at least 3 characters');
  });

  test('returns invalid when description is too long', () => {
    const result: ValidationModel = todoItemModelValidations.description(longDescription);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description must be at most 100 characters');
  });
});
