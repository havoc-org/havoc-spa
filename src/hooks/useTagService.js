import useApi from './useApi';

const endpoint1 = 'projects';
const endpoint2 = 'tasks';

export default function useTagService() {
  const api = useApi();

  const tagService = {
    addtags: async (tags, projectId, taskId) => 
      api.post(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/tags`, tags),

    deleteTag: async (projectId, taskId, tagId) => 
      api.delete(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/tags/${tagId}`),
  };

  return tagService;
}