import { useCallback } from "react";
import Box from "../../../shared/components/box";
import EmptyState from "../../../shared/components/empty-state";
import { TodoItemModel } from "../models/todo-item.model";
import TodoItem from "./todo-item";

interface TodoListProps {
  todoList: TodoItemModel[];
  onUpdateTodo: (todo: TodoItemModel) => void;
  onDelete: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const { todoList, onUpdateTodo, onDelete } = props;

  const onToggleTodo = useCallback((todo: TodoItemModel) => {
    onUpdateTodo({
      ...todo,
      isComplete: !todo.isComplete
    });
  }, [onUpdateTodo]);

  if (!todoList.length) {
    return <EmptyState message="No todos found" />;
  }


  return (
    <Box>
      {todoList.map((todoItem) => (
        <TodoItem
          key={`todo-item-${todoItem.id}`}
          todoItem={todoItem}
          onToggle={() => onToggleTodo(todoItem)}
          onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default TodoList;