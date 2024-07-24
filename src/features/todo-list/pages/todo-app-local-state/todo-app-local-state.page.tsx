
import TodoList from "../../components/todo-list";
import Button from "../../../../shared/components/form/button";
import NewTodoForm from "../../components/new-todo-form";
import Modal from "../../../../shared/components/modal";
import useTodoAppLocalStatePage from "./todo-app-local-state.hook";
import Box from "../../../../shared/components/box";
import { FilterTypes, todoFilters } from "../../config/filters";

const TodoAppLocalState = () => {

  const {
    isAdding,
    onShowAddTodo,
    onAddTodo,
    onDeleteTodo,
    onToggleTodo,
    setIsAdding,
    filterType,
    setFilterType,
    filteredTodos,
  }
    = useTodoAppLocalStatePage();


  return <section>

    <h2 className="text-xl">☑️ Todo App Local State</h2>
    <hr className="my-10" />
    <Box color="bg-slate-50 flex items-center" >
      <small className="text-sm font-bold text-slate-700 mr-4">Filter your list</small>
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as FilterTypes)}
        className="mt-2 p-2 rounded-md border border-slate-300"
      >
        {todoFilters.map(filter => <option key={`filter-${filter.id}`} value={filter.id}>{filter.label}</option>)}
      </select>
    </Box>
    <TodoList
      onToggle={onToggleTodo}
      onDelete={onDeleteTodo}
      todoList={filteredTodos}
    />

    <Button
      onClick={onShowAddTodo}
      variant="solid"
      className="mt-4 "
      aria-label="Add Todo"
    >
      Add Todo
    </Button>

    <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
      <NewTodoForm
        onAdd={onAddTodo} /></Modal>

  </section>

}

export default TodoAppLocalState;