import useApi from './useApi';

const endpoint = 'projects';

export default function useProjectService() {
  const api = useApi();
  const projectService = {
    getProjectById: async (id) => api.get(`${endpoint}/${id}`),
    getProjects: async () => api.get(endpoint),
    createProject: async (data) => api.post(endpoint, data),
    editProject: async (data) => api.put(endpoint, data),
    deleteProject: async (id) => api.delete(`${endpoint}/${id}`),
    updateProject: async (id, data) => api.patch(`${endpoint}/${id}`, data),
    addUserToProject: async (inviteCode) => api.post(`${endpoint}/${inviteCode}`),

  };
  return projectService;
}
