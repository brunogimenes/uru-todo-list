import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import useLists from "../../state/use-lists.hook";
import { ListModel } from "features/lists/models/list.model";


const useListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const state = useLocation().state ?? null;

  const { lists, addTodo, toggleTodo, removeTodo } = useLists();

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<ListModel | null>();

  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const onAddTodo = useCallback((todo: string) => {
    if (list) {
      addTodo(list.id, todo);
    }
    setIsAddingTodo(false);
  }, [addTodo, list]);

  const onToggleTodo = useCallback((todoId: string) => {
    if (list) {
      toggleTodo(list.id, todoId);
    }
  }, [list, toggleTodo]);

  const onRemoveTodo = useCallback((todoId: string) => {
    if (list) {
      removeTodo(list.id, todoId);
    }
  }, [list, removeTodo]);

  const init = useCallback(async () => {
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
    onToggleTodo,
    isAddingTodo,
    setIsAddingTodo
  }
}

export default useListPage;