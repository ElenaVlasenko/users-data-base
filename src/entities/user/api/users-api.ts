import { User, CreateUserParams, UpdateUserParams } from '@entities/user/model/types';
import { AxiosInstance } from 'axios';

export const createUserApi = (client: AxiosInstance) => {
    const fetchUsers = async (): Promise<User[]> => {
        const { data } = await client.get<User[]>('/users');
        return data;
    };

    const createUser = async (body: CreateUserParams): Promise<User> => {
        const { data } = await client.post<User>('/users', body);
        return data;
    };

    const updateUser = async ({ id, ...body }: UpdateUserParams): Promise<User> => {
        const { data } = await client.put<User>(`/users/${id}`, body);
        return data;
    };

    const deleteUser = async (id: string): Promise<void> => {
        await client.delete(`/users/${id}`);
    };

    return ({
        fetchUsers,
        createUser,
        updateUser,
        deleteUser
    });
};
