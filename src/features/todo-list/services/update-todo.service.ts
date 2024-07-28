import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";

type UpdateTodoServiceParams = {
  listId: string;
  todo: TodoItemModel;
}

const updateTodoService = async (params: UpdateTodoServiceParams) => {
  const { listId, todo } = params;
  await MyFetch.instance.write(`/api/lists/${listId}/todos/${todo.id}`, {
    method: 'PATCH',
    body: todo
  });
}

export default updateTodoService;