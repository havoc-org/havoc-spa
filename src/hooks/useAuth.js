import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useApi from './useApi';

export default function useAuth() {
  const api = useApi();
  const contextAction = useContext(AuthContext);
  const endpoint = 'auth';
  const login = async (email, password) => {
    const userData = await api.post(`${endpoint}/login`, { email, password });
    contextAction.login(userData);
  };
  const user = contextAction.user;
  const logout = async () => {
    await api.post(`${endpoint}/logout`);
  };
  const register = async (firstName, lastName, email, password) =>
    api.post(`${endpoint}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
  const refresh = async () => {
    api.post(`${endpoint}/refresh`, {});
  };
  return { login, user, logout, register, refresh };
}
