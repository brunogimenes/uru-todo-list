export type FieldErrors = {
  [key: string]: string[];
};

export interface ValidationModel {
  isValid: boolean;
  errors: FieldErrors;
}
