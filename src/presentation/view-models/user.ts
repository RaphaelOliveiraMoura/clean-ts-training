import { User } from '@/domain/models';

export class UserViewModel {
  email: string;
  name: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;

  static parse(user: User): UserViewModel {
    return {
      email: user.email,
      name: user.name,
      birthDate: user.birthDate.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
