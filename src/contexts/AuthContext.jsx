import { createContext, useState, useEffect, useContext, useRef } from 'react';
import useApi from '../hooks/useApi';
import Loading from '../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const firstRefresh = useRef(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const api = useApi();
  const endpoint = 'auth';

  const login = async (email, password) => {
    const userData = await api.post(`${endpoint}/login`, { email, password });
    setUser({ token: userData?.accessToken });
  };

  async function register(email, password, firstName, lastName) {
    await api.post(`${endpoint}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  async function logout() {
    setIsRefreshing(true);
    await api.post(`${endpoint}/logout`);
    setUser(null);
    setIsRefreshing(false);
  }

  async function refresh() {
    try {
      // setIsRefreshing(true);
      const tokens = await api.post(`${endpoint}/refresh`);
      user.token = tokens.accessToken;
      // setIsRefreshing(false);
      return true;
    } catch (e) {
      await logout();
      navigate('/login');
      // setIsRefreshing(false);
      return false;
    }
  }

  useEffect(() => {
    async function initRefresh() {
      try {
        setIsRefreshing(true);
        const tokens = await api.post(`${endpoint}/refresh`);
        user.token = tokens.accessToken;
        setIsRefreshing(false);
      } catch (e) {
        setIsRefreshing(false);
      }
    }
    if (user?.token == null && firstRefresh.current) initRefresh();
    firstRefresh.current = false;
  }, [user, api]);
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, refresh, isRefreshing }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AppWrapper = ({ children }) => {
  const { isRefreshing } = useContext(AuthContext);

  // if (isRefreshing) {
  //   return <Loading />;
  // }

  return <>{children}</>;
};
