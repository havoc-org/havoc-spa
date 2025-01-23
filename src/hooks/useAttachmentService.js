import useApi from './useApi';

const endpoint1 = 'projects';
const endpoint2 = 'tasks';

export default function useAttachmentService() {
  const api = useApi();

  const attachmentService = {
    addAttachments: async (attachments, projectId, taskId) => 
      api.post(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/attachments`, attachments),
    
    deleteAttachment: async (projectId, taskId, attachmentId) => 
      api.delete(`${endpoint1}/${projectId}/${endpoint2}/${taskId}/attachments/${attachmentId}`),
  };
  
  return attachmentService;
}