import useApi from './useApi';

const endpoint1 = 'projects';
const endpoint2 = 'tasks';

export default function useAssignmentService() {
  const api = useApi();

  const AssignmentService = {
    addAssignment: async (assignment, projectId, taskId) => 
      api.post(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/assignments/addSingle`, assignment),
    addAssignments: async (assignments, projectId, taskId) => 
      api.post(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/assignments/addMultiple`,assignments),

    deleteAssignment: async (projectId, taskId, assignmentId) => 
      api.delete(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/assignments/${assignmentId}`),
    deleteAssignments: async (assignments,taskId, projectId) => 
      api.post(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/assignments/removeMultiple`,assignments),
  };

  return AssignmentService;
}