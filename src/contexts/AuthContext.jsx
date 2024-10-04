import { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth.js';

export const AuthContext = createContext({ user: { token: null } });

export const AuthProvider = ({ children }) => {
  const { refresh } = useAuth();
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  if (user === null) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAA', user);
    refresh();
    console.log('BBBBBBBBBBBBBBBBBBBBBBB', user);
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
