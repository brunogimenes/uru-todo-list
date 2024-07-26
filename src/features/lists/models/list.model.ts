export type ListModel = {
  id: string;
  name: string;
  description?: string;
  color?: string;
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
  description: (description: string) => {
    const errors: string[] = [];

    if (!!description && description.length < 5) {
      errors.push('Description is optional, but, if provided, must be at least 5 characters long');
    }

    return {
      isValid: !errors.length,
      errors
    }
  }
}

export const listModelValidateObject = (list: ListModel) => {
  const nameValidation = listModelValidations.name(list.name);
  const descriptionValidation = listModelValidations.description(list.description);

  return {
    isValid: nameValidation.isValid && descriptionValidation.isValid,
    errors: [
      ...nameValidation.errors,
      ...descriptionValidation.errors
    ]
  }
}