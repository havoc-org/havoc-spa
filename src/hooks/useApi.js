import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const BASE_URL = 'https://localhost:7052/api';

export default function useApi() {
  const { user } = useContext(AuthContext);
  const api = {
    get: async (endpoint, headers = {}) => {
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'GET',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
            ...headers,
          },
        });
        return await response.json();
      } catch (error) {
        handleError(error);
      }
    },

    post: async (endpoint, data) => {
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'POST',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.status != 200) throw new Error(response.status);
        return await response.json();
      } catch (error) {
        handleError(error);
      }
    },

    put: async (endpoint, data, headers = {}) => {
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'PUT',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(data),
        });
        return await response.json();
      } catch (error) {
        handleError(error);
      }
    },

    delete: async (endpoint, headers = {}) => {
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'DELETE',
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
            ...headers,
          },
        });
        return await response.json();
      } catch (error) {
        handleError(error);
      }
    },
  };

  const handleError = (error) => {
    console.error('API call failed. ', error);
    throw error;
  };

  return api;
}
