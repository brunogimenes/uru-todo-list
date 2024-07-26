import { useCallback, useState } from "react";
import { ListModel } from "../../models/list.model";
import { useNavigate } from "react-router-dom";

const useListsPage = () => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState<Partial<ListModel>>({});
  const [listBeingDeleted, setListBeingDeleted] = useState<ListModel | null>(null);

  const onClickDeleteList = useCallback((list: ListModel) => {
    setListBeingDeleted(list);
  }, []);

  const onCancelDelete = useCallback(() => {
    setListBeingDeleted(null);
  }, []);

  const onClickAddList = useCallback(() => {
    navigate('/lists/new');
  }, [navigate]);

  const updateListField = useCallback(() => (field: keyof ListModel, value: string) => {
    setNewList((currList) => ({
      ...currList,
      [field]: value
    }));
  }, []);

  return {
    newList,
    updateListField,
    onClickAddList,
    onClickDeleteList,
    listBeingDeleted,
    onCancelDelete
  }


}

export default useListsPage;