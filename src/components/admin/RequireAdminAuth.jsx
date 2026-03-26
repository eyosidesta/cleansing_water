import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../../lib/auth';

const RequireAdminAuth = ({ children }) => {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RequireAdminAuth;
