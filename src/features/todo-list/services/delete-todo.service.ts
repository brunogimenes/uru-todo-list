import { MyFetch } from "shared/http/my-fetch";

const deleteTodoService = async (listId: string, todoId: string) => {
  await MyFetch.instance.delete('/api/lists/:listId/todos/:todoId', {
    listId,
    todoId,
  },
  );
}

export default deleteTodoService;