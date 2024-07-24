import Box from "../../../shared/components/box";
import EmptyState from "../../../shared/components/empty-state";
import { TodoItemModel } from "../models/todo-item.model";
import TodoItem from "./todo-item";

interface TodoListProps {
  todoList: TodoItemModel[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const { todoList, onToggle, onDelete } = props;


  if (!todoList.length) {
    return <EmptyState message="No todos found" />;
  }

  return (
    <Box>
      {todoList.map((todoItem) => (
        <TodoItem
          key={`todo-item-${todoItem.id}`}
          todoItem={todoItem}
          onToggle={onToggle}
          onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default TodoList;