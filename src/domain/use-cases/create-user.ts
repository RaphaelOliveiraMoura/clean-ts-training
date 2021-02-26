import { User } from '@/domain/models';

export interface CreateUser {
  create: (userParams: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = {
    email: string;
    name: string;
    birthDate: Date;
    password: string;
  };

  export type Result = User;
}
