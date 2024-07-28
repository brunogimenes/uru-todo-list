import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";

type CreateTodoServiceParams = {
  listId: string;
  todo: Omit<TodoItemModel, 'id'>;
}

const createTodoService = async (params: CreateTodoServiceParams) => {
  const { listId, todo } = params;
  return await MyFetch.instance.write<TodoItemModel>('/api/lists/:listId/todos', {
    method: 'POST',
    body: todo,
    params: {
      listId
    }
  });
}

export default createTodoService;