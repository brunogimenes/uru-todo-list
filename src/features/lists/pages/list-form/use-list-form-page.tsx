import { listColors } from "features/lists/config/list-colors";
import useGetLists from "features/lists/hooks/use-get-lists";
import useMutateLists from "features/lists/hooks/use-mutate-list";
import { ListModel } from "features/lists/models/list.model";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useListFormPage = () => {
  const navigate = useNavigate();
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<ListModel>({
    id: '',
    name: '',
    description: '',
    color: listColors[0].value,
    todos: []
  });

  const { data: lists } = useGetLists();
  const { createList, editList } = useMutateLists();
  const [isLoading, setIsLoading] = useState(true);

  const isEditMode = !!listId;

  const getInitialList = useCallback(async () => {
    if (isEditMode) {
      const list = lists.find((list) => list.id === listId);
      if (list) {
        setList(list);
      }
    }

    setIsLoading(false);
  }, [isEditMode, listId, lists]);

  useEffect(() => {
    getInitialList();
  }, [getInitialList]);

  const onListFormSubmit = (list: ListModel) => {
    if (isEditMode) {
      editList(list);
    } else {
      createList(list);
    }
    navigate(-1);
  }

  return {
    listId,
    onListFormSubmit,
    list,
    isLoading
  }

}

export default useListFormPage;