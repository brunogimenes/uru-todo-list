import { ValidationModel } from "../../../shared/models/validation-model";

export interface TodoItemModel {
  id: string;
  description: string;
  isComplete: boolean;
}

export const todoItemModelValidations = {
  description: (value: string): ValidationModel => {
    const errors: string[] = [];
    if (!value) {
      errors.push('Description is required');
    }
    if (value.length < 3) {
      errors.push('Description must be at least 3 characters');
    }
    if (value.length > 100) {
      errors.push('Description must be at most 100 characters');
    }
    return {
      isValid: !errors.length,
      errors
    }
  }
}