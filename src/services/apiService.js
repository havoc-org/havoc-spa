import axios from 'axios';

const API_URL = 'API_URL';

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${API_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API GET request error:', error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API POST request error:', error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${API_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API PUT request error:', error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${API_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API DELETE request error:', error);
      throw error;
    }
  },
};

export default apiService;
