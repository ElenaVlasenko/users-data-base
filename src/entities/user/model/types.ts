export type User = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

export type CreateUserParams = Pick<User, 'name' | 'avatar'>;

export type UpdateUserParams = CreateUserParams & { id: string };
