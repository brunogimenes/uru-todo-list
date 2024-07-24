export const generateTodoId = (description: string) => {
  const normalizedDescription = description.toLowerCase().replace(/\s/g, '');
  return normalizedDescription;
}