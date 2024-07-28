import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom"
import { TodoItemModel } from "features/todo-list/models/todo-item.model";
import useMutateTodo from "features/todo-list/hooks/use-mutate-todo";
import useGetList from "features/lists/hooks/use-get-list";
import useGetTodos from "features/todo-list/hooks/use-get-todos";


const useListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const list = useGetList(listId ?? "");
  const { todos, isLoading: isLoadingGet } = useGetTodos(listId ?? "");

  const {
    createTodo, deleteTodo, editTodo, isLoading: isLoadingMutate
  } = useMutateTodo();

  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const onAddTodo = useCallback((todo: string) => {
    if (list) {
      createTodo({
        listId: list.id,
        todo: {
          description: todo,
          isComplete: false
        }
      });
    }
    setIsAddingTodo(false);
  }, [list, createTodo]);

  const onUpdateTodo = useCallback((todo: TodoItemModel) => {
    if (list) {
      editTodo({
        listId: list.id,
        todo
      });
    }
  }, [list, editTodo]);

  const onRemoveTodo = useCallback((todoId: string) => {
    if (list) {
      deleteTodo({
        listId: list.id,
        todoId
      });
    }
  }, [list, deleteTodo]);


  const isLoading = useMemo(() => isLoadingGet || isLoadingMutate, [isLoadingGet, isLoadingMutate]);

  return {
    todos,
    list,
    onAddTodo,
    onRemoveTodo,
    onUpdateTodo,
    isAddingTodo,
    setIsAddingTodo,
    isLoading
  }
}

export default useListPage;