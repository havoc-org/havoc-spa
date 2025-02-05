import useApi from './useApi';

const endpoint = 'users';


export default function useUserService() {
  const api = useApi();

  const userService = {
    getUser: async (userId) => 
      api.get(`${endpoint}/byId/${userId}`),

    updateUser: async (userData) =>
        api.patch(endpoint, userData),

    updateUserPass: async (oldPass, newPass) => 
        api.patch(`${endpoint}/updatePassword`, { oldPass, newPass }),

  };

  return userService;
}