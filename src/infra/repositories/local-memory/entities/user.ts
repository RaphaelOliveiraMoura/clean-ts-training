import { User } from '@/domain/models';

export class LocalMemoryUserEntity {
  id: number;
  email: string;
  name: string;
  password: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;

  static parse({
    birthDate,
    createdAt,
    updatedAt,
    ...restEntity
  }: User): LocalMemoryUserEntity {
    return {
      ...restEntity,
      birth_date: birthDate,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  static unparse({
    birth_date,
    created_at,
    updated_at,
    ...restEntity
  }: LocalMemoryUserEntity): User {
    return new User({
      ...restEntity,
      birthDate: birth_date,
      createdAt: created_at,
      updatedAt: updated_at,
    });
  }
}
