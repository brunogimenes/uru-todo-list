import React from 'react';
import useListPage from './use-list-page';
import Modal from 'shared/components/modal';
import Button from 'shared/components/form/button';
import TodoList from 'features/todo-list/components/todo-list';
import NewTodoForm from 'features/todo-list/components/new-todo-form/new-todo-form';

const ListPage = () => {

  const { list, onAddTodo, onRemoveTodo, onUpdateTodo, isAddingTodo, setIsAddingTodo } = useListPage();

  if (!list) {
    return null;
  }

  return (
    <div className="text-left">
      <div className="flex">
        <h1 className="text-2xl flex-1">{list.name}</h1>
        <Button variant="link" onClick={() => setIsAddingTodo(true)} className="ml-4">Add Todo</Button>
      </div>
      <p>
        {list.description}
      </p>
      <hr className="my-4" />
      <TodoList todoList={list.todos} onDelete={onRemoveTodo} onUpdateTodo={onUpdateTodo} />

      <Modal isOpen={isAddingTodo} onClose={() => setIsAddingTodo(false)}>
        <NewTodoForm
          onAdd={onAddTodo} />
      </Modal>
    </div>
  )
}

export default ListPage;

export const LazyListPage = React.lazy(() => import('./list.page'));