import { UserEntity, UserEntityDTO } from '@/infra/entities';

export interface UserRepository {
  count: () => Promise<number>;

  create: (user: UserEntityDTO) => Promise<UserEntity>;

  findByEmail: (email: string) => Promise<UserEntity | null>;

  deleteAll: () => Promise<boolean>;
}
