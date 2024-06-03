import CommonLayout from './layout/CommonLayout';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import MoviesDetailPage from './pages/MoviesDetailPage';
import MoviesPage from './pages/MoviesPage';

const routes = [
  {
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/movies',
        element: <MoviesPage />,
      },
      {
        path: '/movies/:id',
        element: <MoviesDetailPage />,
      },
      { path: '/*', element: <ErrorPage /> },
    ],
  },
];

export default routes;
