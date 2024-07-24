export const generateTodoId = (description: string) => {
  // just generates a random id for now
  const random = Math.random().toString(36).substring(7);
  return description.toLowerCase().replace(/[^a-z0-9]/g, '') + random;
}