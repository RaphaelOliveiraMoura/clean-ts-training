import { UserRepository } from '@/data/contracts';
import { UserEntity, UserEntityDTO } from '@/infra/entities';

const users: Array<UserEntity> = [];

export class LocalMemoryUserRepository implements UserRepository {
  async count(): Promise<number> {
    return users.length;
  }

  async create(user: UserEntityDTO): Promise<UserEntity> {
    const id = users.length;
    const newUser = { id, ...user };
    users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const findedUser = users.find((user) => user.email === email);
    return findedUser;
  }

  async deleteAll(): Promise<boolean> {
    users.splice(0, users.length);
    return true;
  }
}
