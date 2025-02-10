import useApi from './useApi';

const endpoint = (projectId) => `projects/${projectId}/participations`;

export default function useParticipationService() {
    const api = useApi();
    const participationService = {
        getParticipations: async (projectId) => api.get(endpoint(projectId)),

        addParticipation: async (projectId, participations) =>
            api.post(endpoint(projectId), participations),

        deleteParticipation: async (projectId, userId) => {
            const response = await api.delete(`${endpoint(projectId)}?userId=${userId}`);
            return response ?? {};
        },
        updateParticipationRole: async (projectId, userId, role) =>
            api.patch(`${endpoint(projectId)}?userId=${userId}`, { role }),

    };
    return participationService;
}