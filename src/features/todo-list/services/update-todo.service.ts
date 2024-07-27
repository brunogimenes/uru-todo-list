import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";

const updateTodoService = async (listId: string, todo: TodoItemModel) => {
  await MyFetch.instance.write(`/api/lists/${listId}/todos/${todo.id}`, {
    method: 'PATCH',
    body: todo
  });
}

export default updateTodoService;