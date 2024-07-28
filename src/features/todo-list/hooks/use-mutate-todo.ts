import { useMutation, } from "@tanstack/react-query";
import createTodoService from "../services/create-todo.service";
import updateTodoService from "../services/update-todo.service";
import deleteTodoService from "../services/delete-todo.service";
import { queryClient } from "config/http/http.config";
import { useMemo } from "react";

const useMutateTodo = () => {
  const { mutateAsync: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ['todos'],
    mutationFn: createTodoService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutateAsync: editTodo, isPending: isEditing } = useMutation({
    mutationKey: ['todos'],
    mutationFn: updateTodoService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutateAsync: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ['todos'],
    mutationFn: deleteTodoService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const isLoading = useMemo(() => isCreating || isEditing || isDeleting, [isCreating, isEditing, isDeleting]);

  return { createTodo, editTodo, deleteTodo, isLoading };
}

export default useMutateTodo;