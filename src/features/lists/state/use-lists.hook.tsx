import { useContext } from "react";
import { ListsContext } from "./lists.provider";

const useLists = () => {
  const context = useContext(ListsContext);

  if (context === undefined) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};

export default useLists;