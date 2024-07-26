import React from 'react';

import { Link } from 'react-router-dom';
import useLists from '../../state/use-lists.hook';
import Button from '../../../../shared/components/form/button';
import useListsPage from './use-lists-page';
import Modal from '../../../../shared/components/modal';
import NewListForm from '../../components/new-list-form';

const ListsPage = () => {

  const { isAddingList, newList, setIsAddingList, updateListField } =
    useListsPage();

  const {
    lists
  } = useLists();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl">📋 Lists</h1>
        <Button variant="solid" aria-label="Add List" onClick={() => setIsAddingList(true)}>
          Add List
        </Button>
      </div>
      <ul>
        {lists.map(list => {
          const bgColor = `bg-${list.color}-100`;
          const hoverClass = `hover:bg-${list.color}-200 hover:shadow-md cursor-pointer`;
          return (
            <li key={list.id} className={`p-4 rounded-lg ${bgColor} ${hoverClass}`}>
              <Link to={`/lists/${list.id} `} className="flex items-center justify-between">

                <h6 className="text-lg font-bold">{list.name}</h6>
                <span className="text-4xl">
                  👉🏽
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      <Modal isOpen={isAddingList} onClose={() => setIsAddingList(false)}>
        <NewListForm
          onAdd={() => { }}
        />
      </Modal>
    </div >
  )
}

export default ListsPage

export const LazyListsPage = React.lazy(() => import('./lists.page'));