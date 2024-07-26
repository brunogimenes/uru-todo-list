import { createContext, useReducer, ReactNode } from 'react';
import { ListModel } from '../models/list.model';
import { generateRandomId } from '../../../shared/utils/utils';

interface ListsContextProps {
  lists: ListModel[];
  addList: (list: ListModel) => void;
  editList: (list: ListModel) => void;
  removeList: (list: ListModel) => void;
  toggleTodo: (listId: string, todoId: string) => void;
  addTodo: (listId: string, todo: string) => void;
  removeTodo: (listId: string, todoId: string) => void;
}

type Action =
  | { type: 'ADD_LIST'; payload: ListModel }
  | { type: 'EDIT_LIST'; payload: ListModel }
  | { type: 'REMOVE_LIST'; payload: ListModel }
  | { type: 'TOGGLE_TODO'; payload: { listId: string, todoId: string } }
  | { type: 'ADD_TODO'; payload: { listId: string, todo: string } }
  | { type: 'REMOVE_TODO'; payload: { listId: string, todoId: string } };


export const ListsContext = createContext<ListsContextProps | undefined>(undefined);

const listsReducer = (state: ListModel[], action: Action): ListModel[] => {
  switch (action.type) {
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
    case 'TOGGLE_TODO':
      return state.map(list => list.id === action.payload.listId ? {
        ...list,
        todos: list.todos.map(todo => todo.id === action.payload.todoId ? {
          ...todo,
          isComplete: !todo.isComplete
        } : todo)
      } : list);
    case 'ADD_TODO':
      return state.map(list => list.id === action.payload.listId ? {
        ...list,
        todos: [...list.todos, {
          id: generateRandomId(),
          description: action.payload.todo,
          isComplete: false
        }]
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

  const addList = (list: ListModel) => {
    dispatch({ type: 'ADD_LIST', payload: list });
  };

  const editList = (updatedList: ListModel) => {
    dispatch({ type: 'EDIT_LIST', payload: updatedList });
  };

  const removeList = (listModel: ListModel) => {
    dispatch({ type: 'REMOVE_LIST', payload: listModel });
  };

  const toggleTodo = (listId: string, todoId: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { listId, todoId } });
  }

  const addTodo = (listId: string, todo: string) => {
    dispatch({ type: 'ADD_TODO', payload: { listId, todo } });
  }

  const removeTodo = (listId: string, todoId: string) => {
    dispatch({
      type: 'REMOVE_TODO', payload: {
        listId, todoId
      }
    });
  }



  return (
    <ListsContext.Provider value={{ lists, addList, editList, removeList, addTodo, removeTodo, toggleTodo }}>
      {children}
    </ListsContext.Provider >
  );
};


