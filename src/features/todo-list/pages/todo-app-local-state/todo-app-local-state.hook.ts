import { FilterTypes } from "features/todo-list/config/filters";
import { TodoItemModel } from "features/todo-list/models/todo-item.model";
import { generateTodoId } from "features/todo-list/utils/todo-utils";
import { useMemo, useState } from "react";

const useTodoAppLocalStatePage = () => {
  const [todos, setTodos] = useState<TodoItemModel[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [filterType, setFilterType] = useState<FilterTypes>('all');

  const filteredTodos = useMemo(() => {
    if (filterType === 'all') {
      return todos;
    }

    return todos.filter(todo => filterType === 'completed' ? todo.isComplete : !todo.isComplete);
  }, [todos, filterType]);


  const onShowAddTodo = () => {
    setIsAdding(true);
  }

  const onAddTodo = (description: string) => {
    const newTodo: TodoItemModel = {
      id: generateTodoId(description),
      description,
      isComplete: false
    }

    setTodos((currTodos) => [...currTodos, newTodo]);
    setIsAdding(false);
  }

  const onDeleteTodo = (id: string) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  }

  const onToggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: !todo.isComplete
        }
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return {
    todos,
    isAdding,
    onShowAddTodo,
    onAddTodo,
    onDeleteTodo,
    onToggleTodo,
    setIsAdding,
    filterType,
    setFilterType,
    filteredTodos
  };
};

export default useTodoAppLocalStatePage;