import React from 'react';
import useListsPage from './use-lists-page';

import { Link } from 'react-router-dom';
import EmptyState from 'shared/components/empty-state';
import Button from 'shared/components/form/button';
import Modal from 'shared/components/modal';
import FixedSpinner from 'shared/components/loader/fixed-spinner';
import DeleteListDialog from 'features/lists/components/delete-list-dialog/delete-list-dialog';

const ListsPage = () => {

  const { lists, isLoading, onClickAddList, listBeingDeleted, onCancelDelete, onClickDeleteList, } =
    useListsPage();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl">📋 Lists</h1>
        <Button variant="solid" aria-label="Add List" onClick={onClickAddList}>
          Add List
        </Button>
      </div>

      {lists.length === 0 && <EmptyState
        message='No lists found'
      />}

      <ul>
        {lists.map(list => {
          const bgColor = `bg-${list.color}-100`;

          return (
            <li key={list.id} className={`${bgColor} border-b-2 flex items-center p-2`}>
              <div className="h-4 w-4 rounded-full mr-4" style={{ backgroundColor: list.color }}></div>
              <Link to={`/lists/${list.id}`} className="flex-1">
                <p className="font-bold flex-1 text-left mx-3">{list.name} <br />
                  <span className="text-gray-500 text-xs font-normal">{list.description}</span>
                </p>
              </Link>
              <Link to={`/lists/${list.id}/edit`} className="text-blue-500 mr-4">✏️</Link>
              <button className="text-red-500 ml-2" onClick={() => onClickDeleteList(list)}>🗑️</button>
            </li>
          )
        })}
      </ul>
      <Modal isOpen={!!listBeingDeleted} onClose={() => onCancelDelete()}>
        <DeleteListDialog list={listBeingDeleted!} onCancel={onCancelDelete} onAfterDelete={() => {
          onCancelDelete();
        }} />
      </Modal>
      <FixedSpinner show={isLoading} />
    </div >
  )
}

export default ListsPage

export const LazyListsPage = React.lazy(() => import('./lists.page'));