
import TodoList from "../../components/todo-list";
import Button from "shared/components/form/button";

import Modal from "shared/components/modal";
import useTodoAppLocalStatePage from "./todo-app-local-state.hook";
import { FilterTypes, todoFilters } from "../../config/filters";
import NewTodoForm from "../../components/new-todo-form/new-todo-form";

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


  return <section className="bg-blue-100 p-2 rounded-sm">
    <h2 className="text-xl">☑️ Todo App Local State</h2>
    <hr className="my-10" />
    <div className="flex justify-start  items-center mb-4">
      <small className="text-sm font-bold text-slate-700 mr-4">Filter your list</small>
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as FilterTypes)}
        className="mt-2 p-2 rounded-md border border-slate-300"
      >
        {todoFilters.map(filter => <option key={`filter-${filter.id}`} value={filter.id}>{filter.label}</option>)}
      </select>
    </div>

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