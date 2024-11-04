import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, isRefreshing } = useContext(AuthContext);
  const location = useLocation();
  return user?.token == null && !isRefreshing ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
