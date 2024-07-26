import { createContext, useReducer, ReactNode } from 'react';
import { ListModel } from '../models/list.model';
import { generateRandomId } from '../../../shared/utils/utils';

interface ListsContextProps {
  lists: ListModel[];
  addList: (name: string, description: string, color?: string) => void;
  editList: (id: string, updatedList: Partial<ListModel>) => void;
  removeList: (id: string) => void;
}

type Action =
  | { type: 'ADD_LIST'; payload: { name: string; description: string; color?: string } }
  | { type: 'EDIT_LIST'; payload: { id: string; updatedList: Partial<ListModel> } }
  | { type: 'REMOVE_LIST'; payload: { id: string } };

export const ListsContext = createContext<ListsContextProps | undefined>(undefined);

const listsReducer = (state: ListModel[], action: Action): ListModel[] => {
  switch (action.type) {
    case 'ADD_LIST':
      return [...state, {
        id: generateRandomId(),
        name: action.payload.name,
        description: action.payload.description,
        color: action.payload.color || 'gray'
      }];
    case 'EDIT_LIST':
      return state.map(list =>
        list.id === action.payload.id ? { ...list, ...action.payload.updatedList } : list
      );
    case 'REMOVE_LIST':
      return state.filter(list => list.id !== action.payload.id);
    default:
      return state;
  }
};

export const ListsProvider = ({ children }: { children: ReactNode }) => {
  const [lists, dispatch] = useReducer(listsReducer, [
    {
      id: generateRandomId(),
      name: 'Personal',
      description: 'Personal todo list',
      color: 'gray'
    }
  ]);

  const addList = (name: string, description: string, color?: string) => {
    dispatch({ type: 'ADD_LIST', payload: { name, description, color } });
  };

  const editList = (id: string, updatedList: Partial<ListModel>) => {
    dispatch({ type: 'EDIT_LIST', payload: { id, updatedList } });
  };

  const removeList = (id: string) => {
    dispatch({ type: 'REMOVE_LIST', payload: { id } });
  };

  return (
    <ListsContext.Provider value={{ lists, addList, editList, removeList }}>
      {children}
    </ListsContext.Provider>
  );
};


