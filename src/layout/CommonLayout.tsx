import { Outlet } from 'react-router-dom';

function CommonLayout() {
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
}

export default CommonLayout;
