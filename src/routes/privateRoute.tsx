import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isLogin, getUserRole, isAllowed, UserRole } from '../utils';

const PrivateRoute = () => {
  const location = useLocation();
  const userRole = getUserRole();

  if (!isLogin()) {
    return <Navigate to='/signin' />;
  }

  if (!isAllowed(userRole, location.pathname)) {
    return (
      <Navigate
        to={userRole === UserRole.SUPER_ADMIN ? '/company' : '/dashboard'}
      />
    );
  }

  return <Outlet />;
};

export default PrivateRoute;
