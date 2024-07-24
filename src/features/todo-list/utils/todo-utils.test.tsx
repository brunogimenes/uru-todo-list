import { generateTodoId } from "./todo-utils";

describe('todo-utils', () => {

  test('should create a random different id everytime', () => {
    const id1 = generateTodoId('Buy Milk');
    const id2 = generateTodoId('Finish the project');
    const id3 = generateTodoId('Go to the gym');

    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });

});