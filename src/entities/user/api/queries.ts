import { createApiClient } from '@shared/api/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUserApi } from './users-api';

const { client, setAuthToken } = createApiClient();
const { fetchUsers, createUser, updateUser } = createUserApi(client);

export const USERS_QUERY_KEY = ['users'];

export const useUsersQuery = () => useQuery({
  queryKey: USERS_QUERY_KEY,
  queryFn: fetchUsers
});

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    }
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    }
  });
};

export { setAuthToken };
