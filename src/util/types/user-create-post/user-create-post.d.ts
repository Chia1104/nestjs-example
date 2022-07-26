import { type uuid } from '../../util/types/uuid';

export type UserCreatePost = {
  id: uuid;
  name: string;
  email: string;
  role: 'user' | 'admin';
};
