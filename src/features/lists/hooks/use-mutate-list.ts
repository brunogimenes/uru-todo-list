import { useMutation } from "@tanstack/react-query";
import createListService from "../services/create-list.service";

import updateListService from "../services/update-list.service";
import { useMemo } from "react";
import deleteListService from "../services/delete-list.service";
import { queryClient } from "config/http/http.config";

const useMutateLists = () => {
  const { mutate: createList, isPending: isLoadingCreation } = useMutation({
    mutationFn: createListService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  const { mutate: editList, isPending: isLoadingEdition } = useMutation({
    mutationFn: updateListService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  const { mutate: deleteList, isPending: isLoadingDeletion } = useMutation({
    mutationFn: deleteListService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  const isLoading = useMemo(() => isLoadingCreation || isLoadingEdition || isLoadingDeletion,
    [isLoadingCreation, isLoadingEdition, isLoadingDeletion]);

  return { createList, editList, deleteList, isLoading };


};



export default useMutateLists;