import { useCallback, useState } from "react";
import { ListModel } from "../../models/list.model";

const useListsPage = () => {
  const [newList, setNewList] = useState<Partial<ListModel>>({});
  const [isAddingList, setIsAddingList] = useState(false);


  const updateListField = useCallback(() => (field: keyof ListModel, value: string) => {
    setNewList((currList) => ({
      ...currList,
      [field]: value
    }));
  }, []);

  return {
    newList,
    updateListField,
    isAddingList,
    setIsAddingList
  }


}

export default useListsPage;