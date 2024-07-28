
import { Suspense } from 'react';
import './App.css'
import HomePage from './features/home/home.page';
import { LazyListPage } from './features/lists/pages/list/list.page';
import { LazyListsPage } from './features/lists/pages/lists/lists.page';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LazyListFormPage } from './features/lists/pages/list-form/list-form.page';
import { MyFetch } from 'shared/http/my-fetch';
import { httpConfig, queryClient } from 'config/http/http.config';
import { QueryClientProvider } from '@tanstack/react-query';


MyFetch.createInstance({
  baseURL: httpConfig.baseURL,
  cacheTTL: 20000,
});

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
        path: '/lists',
        element: <LazyListsPage />,
      },

      {
        path: '/lists/:listId',
        element: <LazyListPage />,
      },
      {
        path: '/lists/new',
        element: <LazyListFormPage />,
      },
      {
        path: '/lists/:listId/edit',
        element: <LazyListFormPage />,
      },

    ]
  }
]);

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
