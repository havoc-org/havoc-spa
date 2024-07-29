// apiService.js
const BASE_URL = 'https://localhost:7052/api'; // Replace with your API base URL

const apiService = {
  get: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  post: async (endpoint, data, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  put: async (endpoint, data, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = response;
    throw new Error(error.message);
  }
  return response.json();
};

const handleError = (error) => {
  console.error('API call failed. ', error);
  throw error;
};

export default apiService;
