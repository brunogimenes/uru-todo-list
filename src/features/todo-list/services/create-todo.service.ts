import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";

const createTodoService = async (listId: string, todo: Omit<TodoItemModel, 'id'>) => {
  return await MyFetch.instance.write<TodoItemModel>('/api/lists/:listId/todos', {
    method: 'POST',
    body: todo,
    params: {
      listId
    }
  });
}

export default createTodoService;