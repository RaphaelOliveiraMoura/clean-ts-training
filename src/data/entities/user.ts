import { User } from '@/domain/models';

export interface UserEntityDTO {
  email: string;
  name: string;
  password: string;
  birthDate: Date;
}

export type UserEntity = User;
