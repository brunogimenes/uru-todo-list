import { useQuery } from "@tanstack/react-query";
import getListsService from "../services/get-lists.service";


const useGetLists = () => {
  const { data = [], error, isLoading, refetch } = useQuery(
    {
      queryKey: ["lists"],
      queryFn: getListsService,
    }
  );
  return { data, error, isLoading, refetch };
}

export default useGetLists;