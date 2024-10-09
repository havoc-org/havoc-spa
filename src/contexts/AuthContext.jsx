import { createContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const api = useApi();
  const endpoint = 'auth';

  const login = async (email, password) => {
    setIsRefreshing(true);
    const userData = await api.post(`${endpoint}/login`, { email, password });
    setUser({ token: userData.accessToken });
    setIsRefreshing(false);
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
    setIsRefreshing(true);
    const tokens = await api.post(`${endpoint}/refresh`);
    user.token = tokens.accessToken;
    // console.log('I must render first');
    setIsRefreshing(false);
  }

  useEffect(() => {
    (async () => {
      if (user?.token == null && !isRefreshing) await refresh();
    })();
  });
  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, refresh, isRefreshing }}
    >
      {children}
    </AuthContext.Provider>
  );
};
