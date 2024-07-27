import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import useLists from "../../state/use-lists.hook";
import { ListModel } from "features/lists/models/list.model";
import { TodoItemModel } from "features/todo-list/models/todo-item.model";


const useListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const state = useLocation().state ?? null;

  const { fetchLists, lists, addTodo, updateTodo, removeTodo } = useLists();

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<ListModel | null>();

  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const onAddTodo = useCallback((todo: string) => {
    if (list) {
      addTodo(list.id, todo);
    }
    setIsAddingTodo(false);
  }, [addTodo, list]);

  const onUpdateTodo = useCallback((todo: TodoItemModel) => {
    if (list) {
      updateTodo(list.id, todo);
    }
  }, [list, updateTodo]);

  const onRemoveTodo = useCallback((todoId: string) => {
    if (list) {
      removeTodo(list.id, todoId);
    }
  }, [list, removeTodo]);

  const init = useCallback(async () => {
    if (!lists.length) {
      await fetchLists();
    }
    if (state && state.loadedList) {
      setList(state.loadedList);
      return;
    }

    if (listId) {
      const list = lists.find((list) => list.id === listId);

      if (list) {
        setList(list);
      }
    }
    setIsLoading(false);
  }, [listId, lists, state]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    isLoading,
    list,
    onAddTodo,
    onRemoveTodo,
    onUpdateTodo,
    isAddingTodo,
    setIsAddingTodo
  }
}

export default useListPage;