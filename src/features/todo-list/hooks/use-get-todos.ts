import { useQuery } from "@tanstack/react-query";
import getTodosService from "../services/get-todos.service";

const useGetTodos = (listId: string) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['todos', listId],
    queryFn: () => getTodosService(listId)
  });

  return {
    todos: data,
    isLoading
  }
}

export default useGetTodos;