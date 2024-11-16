import { Navigate, Outlet } from 'react-router-dom';
import { isLogin, getUserRole, UserRole } from '../utils'; // Assuming getUserRole is a function that fetches the user's role

const PublicRoute = () => {
  const userRole = getUserRole();

  if (isLogin()) {
    return userRole === UserRole.SUPER_ADMIN ? (
      <Navigate to='/company' />
    ) : (
      <Navigate to='/dashboard' />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
