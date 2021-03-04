import { User } from '@/domain/models';
import { CreateUser } from '@/domain/use-cases';

export interface UserRepository {
  count: () => Promise<number>;

  create: (user: CreateUser.Params) => Promise<User>;

  findByEmail: (email: string) => Promise<User | null>;

  deleteAll: () => Promise<boolean>;
}
