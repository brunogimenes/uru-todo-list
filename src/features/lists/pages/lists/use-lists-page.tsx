import useGetLists from "features/lists/hooks/use-get-lists";
import { ListModel } from "features/lists/models/list.model";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const useListsPage = () => {
  const navigate = useNavigate();
  const { data: lists, isLoading } = useGetLists();
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

  return {
    lists,
    isLoading,
    onClickAddList,
    onClickDeleteList,
    listBeingDeleted,
    onCancelDelete
  }

}

export default useListsPage;