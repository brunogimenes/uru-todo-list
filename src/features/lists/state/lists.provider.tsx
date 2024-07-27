import { createContext, useReducer, ReactNode, useCallback } from 'react';
import { generateRandomId } from 'shared/utils/utils';
import { ListModel } from '../models/list.model';
import createListService from '../services/create-list.service';
import getListsService from '../services/get-lists.service';
import updateListService from '../services/update-list.service';
import deleteListService from '../services/delete-list.service';
import createTodoService from 'features/todo-list/services/create-todo.service';
import deleteTodoService from 'features/todo-list/services/delete-todo.service';
import { TodoItemModel } from 'features/todo-list/models/todo-item.model';
import updateTodoService from 'features/todo-list/services/update-todo.service';



export interface ListsContextProps {
  lists: ListModel[];
  fetchLists: () => void;
  addList: (list: ListModel) => void;
  editList: (list: ListModel) => void;
  removeList: (list: ListModel) => void;
  updateTodo: (listId: string, todo: TodoItemModel) => void;
  addTodo: (listId: string, todo: string) => void;
  removeTodo: (listId: string, todoId: string) => void;
  setIsLoading?: (isLoading: boolean) => void;
}

type Action =
  | { type: 'FETCH_LISTS'; payload: ListModel[] }
  | { type: 'ADD_LIST'; payload: ListModel }
  | { type: 'EDIT_LIST'; payload: ListModel }
  | { type: 'REMOVE_LIST'; payload: ListModel }
  | { type: 'UPDATE_TODO'; payload: { listId: string, todo: TodoItemModel } }
  | { type: 'ADD_TODO'; payload: { listId: string, todo: TodoItemModel } }
  | { type: 'REMOVE_TODO'; payload: { listId: string, todoId: string } };


export const ListsContext = createContext<ListsContextProps | undefined>(undefined);

const listsReducer = (state: ListModel[], action: Action): ListModel[] => {
  switch (action.type) {
    case 'FETCH_LISTS':
      return action.payload;
    case 'ADD_LIST':
      return [...state, {
        id: generateRandomId(),
        name: action.payload.name,
        description: action.payload.description,
        color: action.payload.color || 'gray',
        todos: []
      }];
    case 'EDIT_LIST':
      return state.map(list =>
        list.id === action.payload.id ? {
          ...list, ...action.payload,
          todos: list.todos
        } : list
      );
    case 'REMOVE_LIST':
      return state.filter(list => list.id !== action.payload.id);
    case 'UPDATE_TODO':
      return state.map(list => list.id === action.payload.listId ? {
        ...list,
        todos: list.todos.map(todo => todo.id === action.payload.todo.id ?
          action.payload.todo : todo)
      } : list);
    case 'ADD_TODO':
      return state.map(list => list.id === action.payload.listId ? {
        ...list,
        todos: [...list.todos, action.payload.todo]
      } : list);
    case 'REMOVE_TODO':
      return state.map(list => list.id === action.payload.listId ? {
        ...list,
        todos: list.todos.filter(todo => todo.id !== action.payload.todoId)
      } : list);
    default:
      return state;
  }
};

export const ListsProvider = ({ children }: { children: ReactNode }) => {
  const [lists, dispatch] = useReducer(listsReducer, [
  ]);

  const fetchLists = useCallback(async () => {
    const lists = await getListsService();
    dispatch({ type: 'FETCH_LISTS', payload: lists });
  }, []);

  const addList = useCallback(async (list: ListModel) => {
    await createListService(list);
    dispatch({ type: 'ADD_LIST', payload: list });
  }, []);

  const editList = useCallback(async (updatedList: ListModel) => {
    await updateListService(updatedList);
    dispatch({ type: 'EDIT_LIST', payload: updatedList });
  }, []);

  const removeList = useCallback(async (listModel: ListModel) => {
    await deleteListService(listModel.id);
    dispatch({ type: 'REMOVE_LIST', payload: listModel });
  }, []);

  const updateTodo = useCallback(async (listId: string, todo: TodoItemModel) => {
    await updateTodoService(listId, todo);
    dispatch({ type: 'UPDATE_TODO', payload: { listId, todo } });
  }, []);

  const addTodo = useCallback(async (listId: string, todo: string) => {
    const newTodo = await createTodoService(listId, {
      description: todo,
      isComplete: false
    });
    dispatch({ type: 'ADD_TODO', payload: { listId, todo: newTodo } });
  }, []);

  const removeTodo = useCallback(async (listId: string, todoId: string) => {
    await deleteTodoService(listId, todoId);
    dispatch({
      type: 'REMOVE_TODO', payload: {
        listId, todoId
      }
    });
  }, []);



  return (
    <ListsContext.Provider value={{
      lists,
      fetchLists,
      addList,
      editList,
      removeList,
      addTodo,
      removeTodo,
      updateTodo
    }}>
      {children}
    </ListsContext.Provider >
  );
};


