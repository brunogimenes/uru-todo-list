import { MyFetch } from "shared/http/my-fetch";
import { TodoItemModel } from "../models/todo-item.model";


const getTodosService = async (listId: string) => {
  const response = await MyFetch.instance.read<TodoItemModel[]>('/api/lists/:listId/todos', {
    listId: listId
  });
  return response;
}

export default getTodosService;