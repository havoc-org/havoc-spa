import useAuth from './useAuth';

const BASE_URL = 'https://localhost:7052/api';

export default function useApi() {
  const { user, refresh } = useAuth();

  async function makeAsyncRequest(method, endpoint, headers = {}, data) {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: method,
      credentials: 'include',
      headers: {
        Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method == 'GET' ? null : JSON.stringify(data),
    });
    if (!response.ok) {
      const body = await response.json();
      const error = new Error(body.message);
      error.status = response.status;
      throw error;
    }
    return await response.json();
  }

  const api = {
    get: async (endpoint, headers = {}) => {
      try {
        // const response = await fetch(`${BASE_URL}/${endpoint}`, {
        //   method: 'GET',
        //   credentials: 'include',
        //   headers: {
        //     Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        //     'Access-Control-Allow-Credentials': true,
        //     'Content-Type': 'application/json',
        //     ...headers,
        //   },
        // });
        // return await response.json();
        return await makeAsyncRequest('GET', endpoint, headers);
      } catch (error) {
        handleError(error);
      }
    },

    post: async (endpoint, data, headers = {}) => {
      try {
        // const response = await fetch(`${BASE_URL}/${endpoint}`, {
        //   method: 'POST',
        //   credentials: 'include',
        //   headers: {
        //     Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        //     'Access-Control-Allow-Credentials': true,
        //     'Content-Type': 'application/json',
        //     ...headers,
        //   },
        //   body: JSON.stringify(data),
        // });

        // if (response.status != 200) {
        //   const body = await response.json();
        //   const error = new Error(body.message);
        //   error.status = response.status;
        //   throw error;
        // }

        // return await response.json();
        return await makeAsyncRequest('POST', endpoint, headers, data);
      } catch (error) {
        handleError(error);
        return null;
      }
    },

    put: async (endpoint, data, headers = {}) => {
      try {
        // const response = await fetch(`${BASE_URL}/${endpoint}`, {
        //   method: 'PUT',
        //   credentials: 'include',
        //   headers: {
        //     Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        //     'Access-Control-Allow-Credentials': true,
        //     'Content-Type': 'application/json',
        //     ...headers,
        //   },
        //   body: JSON.stringify(data),
        // });
        // return await response.json();
        return await makeAsyncRequest('POST', endpoint, headers, data);
      } catch (error) {
        await handleError(error);
      }
    },

    delete: async (endpoint, headers = {}) => {
      try {
        // const response = await fetch(`${BASE_URL}/${endpoint}`, {
        //   method: 'DELETE',
        //   credentials: 'include',
        //   headers: {
        //     Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        //     'Access-Control-Allow-Credentials': true,
        //     'Content-Type': 'application/json',
        //     ...headers,
        //   },
        // });
        // return await response.json();
        return await makeAsyncRequest('POST', endpoint, headers);
      } catch (error) {
        await handleError(error);
      }
    },
  };

  const handleError = async (error) => {
    console.error('API call failed. ', error);
    if (refresh) await refresh();
    throw error;
  };

  return api;
}
