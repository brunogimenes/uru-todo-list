import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";

const createTodoService = async (listId: string, todo: Omit<TodoItemModel, 'id'>) => {
  await MyFetch.instance.write('/api/lists/:listId/todos', {
    method: 'POST',
    body: todo,
    params: {
      listId
    }
  });
}

export default createTodoService;