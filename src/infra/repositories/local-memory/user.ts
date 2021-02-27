import { LocalMemoryUserEntity } from './entities';

import { UserRepository } from '@/data/contracts';
import { UserEntity, UserEntityDTO } from '@/data/entities';

const users: Array<LocalMemoryUserEntity> = [];

export class LocalMemoryUserRepository implements UserRepository {
  async count(): Promise<number> {
    return users.length;
  }

  async create(user: UserEntityDTO): Promise<UserEntity> {
    const id = users.length;
    const userEntity = new UserEntity({
      ...user,
      id,
      birthDate: new Date(user.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const parsedUser = LocalMemoryUserEntity.parse(userEntity);
    users.push(parsedUser);
    return LocalMemoryUserEntity.unparse(parsedUser);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const findedUser = users.find((user) => user.email === email);

    if (!findedUser) return null;

    return LocalMemoryUserEntity.unparse(findedUser);
  }

  async deleteAll(): Promise<boolean> {
    users.splice(0, users.length);
    return true;
  }
}
