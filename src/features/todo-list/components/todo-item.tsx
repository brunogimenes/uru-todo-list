import Button from "../../../shared/components/form/button";
import { TodoItemModel } from "../models/todo-item.model";

interface TodoItemProps {
  todoItem: TodoItemModel;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { todoItem, onToggle, onDelete } = props;

  const isCompleteClass = todoItem.isComplete ? "line-through opacity-70" : "";
  const hoverClass = "cursor-pointer hover:underline";


  return (
    <div aria-label="Todo Container" color="p-10" className={`flex items-center ${isCompleteClass}`}

    >
      <div
        className={`flex-1 text-left ${hoverClass}`} onClick={() => onToggle(todoItem.id)}>
        <input
          role="checkbox"
          type="checkbox"
          checked={todoItem.isComplete}
          onChange={() => onToggle(todoItem.id)}
          className="mr-4 pointer-events-none"
        />
        <span >{todoItem.description}</span>
      </div>

      <Button
        aria-label="Delete Todo"
        className="transition-all scale-75 hover:scale-100 opacity-90 hover:opacity-100"
        onClick={() => {
          onDelete(todoItem.id);
        }} variant="link">
        🗑️
      </Button>
    </div>
  );

}

export default TodoItem;