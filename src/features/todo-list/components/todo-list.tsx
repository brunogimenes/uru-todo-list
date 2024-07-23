import { TodoItemModel } from "../models/todo-item.model";
import TodoItem from "./todo-item";

interface TodoListProps {
  todoList: TodoItemModel[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const { todoList, onToggle, onDelete } = props;

  return (
    <div>
      {todoList.map((todoItem) => (
        <TodoItem
          key={`todo-item-${todoItem.id}`}
          todoItem={todoItem}
          onToggle={onToggle}
          onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;