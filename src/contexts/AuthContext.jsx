import { createContext, useState, useContext } from 'react';
import useApi from '../hooks/useApi';
import { ProjectContext } from './ProjectContext';
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const projectContext = useContext(ProjectContext);
  const [user, setUser] = useState({});
  // const [persist, setPersist] = useState(
  //   JSON.parse(localStorage.getItem('persist') || false)
  // );
  const api = useApi();
  const endpoint = 'auth';

  const login = async (email, password) => {
    const userData = await api.post(`${endpoint}/login`, { email, password });
    setUser({
      email: userData?.email,
      id: userData?.userId,
      token: userData?.accessToken,
    });
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
    await api.post(`${endpoint}/logout`);
    setUser(null);
    projectContext.leaveProject();
  }

  async function refresh() {
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
