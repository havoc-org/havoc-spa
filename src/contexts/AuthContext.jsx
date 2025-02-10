import { createContext, useState, useContext, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { ProjectContext } from './ProjectContext';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const projectContext = useContext(ProjectContext);
  const [user, setUser] = useState({});
  const [out, setOut] = useState(false);
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem('persist') || false)
  // );
  const api = useApi();
  const endpoint = 'auth';

  const login = async (email, password) => {
    setOut(false);
    const userData = await api.post(`${endpoint}/login`, { email, password });
    setUser({
      email: userData?.email,
      id: userData?.userId,
      token: userData?.accessToken,
    });
  };

  async function register(email, password, firstName, lastName) {
    setOut(false);
    await api.post(`${endpoint}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
  }

  async function logout() {
    setOut(true);
    await api.post(`${endpoint}/logout`);
    setUser(null);
    projectContext.leaveProject();
  }

  async function refresh() {
    if (out) return false;
    try {
      const userData = await api.post(`${endpoint}/refresh`);
      setUser({
        email: userData?.email,
        id: userData?.userId,
        token: userData?.accessToken,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const GlobalLoginRefresher = ({ children }) => {
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
  else return <>{children}</>;
};
