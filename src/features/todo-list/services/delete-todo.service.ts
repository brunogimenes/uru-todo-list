import { MyFetch } from "shared/http/my-fetch";

const deleteTodoService = async (listId: string, todoId: string) => {
  await MyFetch.instance.write('/api/lists/:listId/todos', {
    method: 'DELETE',
    params: {
      listId,
      todoId
    }
  });
}

export default deleteTodoService;