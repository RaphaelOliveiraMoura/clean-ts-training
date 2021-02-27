import { User } from '@/domain/models';

export interface UserEntityDTO {
  email: string;
  name: string;
  password: string;
  birthDate: string;
}

export class UserEntity extends User {}
