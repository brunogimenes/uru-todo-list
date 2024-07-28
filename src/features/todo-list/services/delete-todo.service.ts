import { MyFetch } from "shared/http/my-fetch";

type DeleteTodoServiceParams = {
  listId: string;
  todoId: string;
}

const deleteTodoService = async (params: DeleteTodoServiceParams) => {
  const { listId, todoId } = params
  await MyFetch.instance.delete('/api/lists/:listId/todos/:todoId', {
    listId,
    todoId,
  },
  );
}

export default deleteTodoService;