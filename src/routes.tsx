import CommonLayout from './layout/CommonLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
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
    ],
  },
];

export default routes;
