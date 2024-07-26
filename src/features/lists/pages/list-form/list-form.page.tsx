import React from 'react';
import useListFormPage from './use-list-form-page';
import NewListForm from '../../components/new-list-form/new-list-form';

const ListFormPage = () => {

  const {
    listId,
    onListFormSubmit,
    list,
    isLoading
  } = useListFormPage();

  const title = listId ? 'Edit List' : 'New List';


  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <hr className="my-4" />
      {isLoading ? <p>Loading...</p> : (
        <NewListForm initialList={list} onConfirm={onListFormSubmit} />
      )}

    </div>
  )
}

export default ListFormPage;

export const LazyListFormPage = React.lazy(() => import('./list-form.page'));