import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListModel } from "../../models/list.model";
import useLists from "../../state/use-lists.hook";
import { listColors } from "../../config/list-colors";

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
  const { lists, addList, editList } = useLists();
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
      addList(list);
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