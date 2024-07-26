import { FieldErrors, ValidationModel } from "../../../shared/models/validation-model";

export interface TodoItemModel {
  id: string;
  description: string;
  isComplete: boolean;
}

export const todoItemModelValidations = {
  description: (value: string): FieldErrors => {
    const errors: FieldErrors = {};
    if (!value) {
      errors['description'] = ['Description is required'];
    }
    else if (value.length < 3) {
      errors['description'] = ['Description must be at least 3 characters'];
    }
    else if (value.length > 100) {
      errors['description'] = ['Description must be at most 100'];
    }

    return errors;
  }
}

export const todoItemModelValidator = (todoItem: TodoItemModel): ValidationModel => {
  const errors: FieldErrors = {};

  const descriptionErrors = todoItemModelValidations.description(todoItem.description);
  if (descriptionErrors.description) {
    errors['description'] = descriptionErrors.description;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}