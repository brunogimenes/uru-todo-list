
import { Suspense } from 'react';
import './App.css'
import HomePage from './features/home/home.page';
import { LazyListPage } from './features/lists/pages/list/list.page';
import { LazyListsPage } from './features/lists/pages/lists/lists.page';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        index: true,
        path: '/',
        element: <LazyListsPage />,
      },
      {
        index: true,
        path: '/lists',
        element: <LazyListsPage />,
      },
      {
        path: '/lists/:listId',
        element: <LazyListPage />,
      }
    ]
  }
]);

function App() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
