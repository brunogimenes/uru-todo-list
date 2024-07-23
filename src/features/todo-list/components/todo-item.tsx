import { TodoItemModel } from "./models/todo-item.model";

interface TodoItemProps {
  todoItem: TodoItemModel;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { todoItem, onToggle, onDelete } = props;

  return (
    <div>
      <input
        type="checkbox"
        checked={todoItem.isComplete}
        onChange={() => onToggle(todoItem.id)}
      />
      <span>{todoItem.description}</span>
      <button onClick={() => onDelete(todoItem.id)}>Delete</button>
    </div>
  );

}

export default TodoItem;