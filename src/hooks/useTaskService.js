import useApi from './useApi';

const endpoint = 'tasks';

export default function useTaskService() {
  const api = useApi();
  const taskService = {
    getTasks: async (projectId) => api.get(`${endpoint}/${projectId}`),
    createTask: async (taskData) => api.post(endpoint, taskData),
    editTask: async (taskData) => api.put(endpoint, taskData),
    editStatus: async (taskData) => api.patch(`${endpoint}/updateStatus`, taskData),
    deleteTask: async (taskId) => api.delete(`${endpoint}/${taskId}`),
  };
  return taskService;
}