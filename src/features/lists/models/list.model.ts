import { TodoItemModel } from "features/todo-list/models/todo-item.model";
import { ValidationModel } from "shared/models/validation-model";


export type ListModel = {
  id: string;
  name: string;
  description?: string;
  color?: string;
  todos: TodoItemModel[];
}

export const listModelValidations = {
  name: (name: string) => {
    const errors: string[] = [];
    if (!name) {
      errors.push('Name is required');
    }

    return {
      isValid: !errors.length,
      errors
    }
  },
  description: (description?: string) => {
    const errors: string[] = [];

    if (!description) {
      errors.push('Description is required');
    }

    return {
      isValid: !errors.length,
      errors
    }
  }
}

export const listModelValidateObject = (list: ListModel): ValidationModel => {
  const nameValidation = listModelValidations.name(list.name);
  const descriptionValidation = listModelValidations.description(list.description);

  return {
    isValid: nameValidation.isValid && descriptionValidation.isValid,
    errors: {
      name: nameValidation.errors,
      description: descriptionValidation.errors
    }
  }
}