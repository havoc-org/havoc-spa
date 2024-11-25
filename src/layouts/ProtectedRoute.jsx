import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';

export default function ProtectedRoute() {
  const location = useLocation();
  const { refresh, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function initRefresh() {
      setIsLoading(true);
      await refresh();
      setIsLoading(false);
    }
    user?.token == null ? initRefresh() : setIsLoading(false);
  }, [refresh, user]);
  if (isLoading) return <Loading />;
  return user?.token == null ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
