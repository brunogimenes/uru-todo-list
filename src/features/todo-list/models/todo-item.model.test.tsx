
import { ValidationModel } from '../../../shared/models/validation-model';
import { TodoItemModel, todoItemModelValidator } from './todo-item.model';

describe('TodoItemModel Validations', () => {


  const validDescription = 'I am so valid 🙂';
  const shortDescription = 'aa';
  const longDescription = 'a'.repeat(101);

  test('returns valid for a correct description', () => {
    const fakeTodoItemModel: TodoItemModel = {
      id: '123',
      description: validDescription,
      isComplete: false
    };

    const result: ValidationModel = todoItemModelValidator(fakeTodoItemModel);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test('returns invalid when description is empty', () => {
    const fakeTodoItemModel: TodoItemModel = {
      id: '123',
      description: '',
      isComplete: false
    };

    const result: ValidationModel = todoItemModelValidator(fakeTodoItemModel);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('description');
    expect(result.errors['description']).toContain('Description is required');
  });

  test('returns invalid when description is too short', () => {
    const fakeTodoItemModel: TodoItemModel = {
      id: '123',
      description: shortDescription,
      isComplete: false
    };

    const result: ValidationModel = todoItemModelValidator(fakeTodoItemModel);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('description');
    expect(result.errors['description']).toContain('Description must be at least 3 characters');
  });

  test('returns invalid when description is too long', () => {
    const fakeTodoItemModel: TodoItemModel = {
      id: '123',
      description: longDescription,
      isComplete: false
    };

    const result: ValidationModel = todoItemModelValidator(fakeTodoItemModel);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('description');
    expect(result.errors['description']).toContain('Description must be at most 100');
  });
});
