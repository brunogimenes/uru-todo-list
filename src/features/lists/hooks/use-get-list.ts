import { useMemo } from "react";
import useGetLists from "./use-get-lists";

const useGetList = (listId: string) => {
  const { data: lists } = useGetLists();

  const list = useMemo(() => {
    return lists.find((list) => list.id === listId);
  }, [listId, lists]);

  return list;
}

export default useGetList;