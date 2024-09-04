import useApi from './useApi';

const endpoint = 'projects';

export default function useProjectService() {
  const api = useApi();
  const projectService = {
    getProjects: async () => api.get(endpoint),
    createProject: async (data) => api.post(endpoint, data),
    editProject: async (data) => api.put(endpoint, data),
    deleteProject: async (id) => api.delete(`${endpoint}/${id}`),
  };
  return projectService;
}