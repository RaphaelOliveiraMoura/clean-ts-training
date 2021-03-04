import { LocalMemoryUserEntity } from './entities';

import { UserRepository } from '@/data/contracts';
import { User } from '@/domain/models';
import { CreateUser } from '@/domain/use-cases';

const users: Array<LocalMemoryUserEntity> = [];

export class LocalMemoryUserRepository implements UserRepository {
  async count(): Promise<number> {
    return users.length;
  }

  async create(user: CreateUser.Params): Promise<User> {
    const id = users.length;
    const parsedUser = LocalMemoryUserEntity.parse({
      ...user,
      id,
      birthDate: new Date(user.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    users.push(parsedUser);
    return LocalMemoryUserEntity.unparse(parsedUser);
  }

  async findByEmail(email: string): Promise<User> {
    const findedUser = users.find((user) => user.email === email);

    if (!findedUser) return null;

    return LocalMemoryUserEntity.unparse(findedUser);
  }

  async deleteAll(): Promise<boolean> {
    users.splice(0, users.length);
    return true;
  }
}
