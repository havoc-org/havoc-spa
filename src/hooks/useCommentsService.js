import useApi from './useApi';

const endpoint = 'tasks';

export default function useCommentService() {
  const api = useApi();
  const commentService = {
    getAllComments: async (taskId) => api.get(`${endpoint}/${taskId}/comments`),
    createComment: async (comment, taskId) => api.post(`${endpoint}/${taskId}/comments`, comment),
  };
  return commentService;
}