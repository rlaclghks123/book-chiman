import CommonLayout from './layout/CommonLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const routes = [
  {
    element: <CommonLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/*', element: <ErrorPage /> },
    ],
  },
];

export default routes;
