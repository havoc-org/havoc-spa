import useAuth from './useAuth';

const BASE_URL = 'https://localhost:7052/api';

export default function useApi() {
  const { user, refresh } = useAuth();

  async function makeAsyncRequest(method, endpoint, headers = {}, data) {
    const requestBody = {
      method: method,
      credentials: 'include',
      headers: {
        Authorization: user?.token != null ? `Bearer ${user?.token}` : '',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method == 'GET' ? null : JSON.stringify(data),
    };
    let response = await fetch(`${BASE_URL}/${endpoint}`, requestBody);
    if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 403
    ) {
      if (refresh && (await refresh()))
        response = await fetch(`${BASE_URL}/${endpoint}`, requestBody);
      else {
        const error = new Error(await response.json());
        error.status = response.status;
        throw error;
      }
    }
    return await response.json();
  }

  const api = {
    get: async (endpoint, headers = {}) => {
      try {
        return await makeAsyncRequest('GET', endpoint, headers);
      } catch (error) {
        await handleError(error);
      }
    },

    post: async (endpoint, data, headers = {}) => {
      try {
        return await makeAsyncRequest('POST', endpoint, headers, data);
      } catch (error) {
        await handleError(error);
        return null;
      }
    },

    put: async (endpoint, data, headers = {}) => {
      try {
        return await makeAsyncRequest('PUT', endpoint, headers, data);
      } catch (error) {
        await handleError(error);
      }
    },
    patch: async (endpoint, data, headers = {}) => {
      try {
        return await makeAsyncRequest('PATCH', endpoint, headers, data);
      } catch (error) {
        await handleError(error);
      }
    },
    delete: async (endpoint, headers = {}) => {
      try {
        return await makeAsyncRequest('DELETE', endpoint, headers);
      } catch (error) {
        await handleError(error);
      }
    },
  };

  const handleError = async (error) => {
    if (refresh) await refresh();
    throw error;
  };

  return api;
}
