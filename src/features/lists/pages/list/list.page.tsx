import React from 'react';

const ListPage = () => {
  return (
    <div>
      <h1>List Page</h1>
    </div>
  )
}

export default ListPage;

export const LazyListPage = React.lazy(() => import('./list.page'));