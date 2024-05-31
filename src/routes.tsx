import CommonLayout from './layout/CommonLayout';
import HomePage from './pages/HomePage';

const routes = [
  {
    element: <CommonLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
];

export default routes;
