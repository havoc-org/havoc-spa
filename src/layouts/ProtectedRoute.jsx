import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, isRefreshing } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user, isRefreshing, navigate);
    if (user?.token == null && !isRefreshing)
      navigate({ to: '/login', state: { from: 'location' }, replace: true });
  }, [user, isRefreshing, navigate]);

  return user?.token == null ? null : <Outlet />;
}
