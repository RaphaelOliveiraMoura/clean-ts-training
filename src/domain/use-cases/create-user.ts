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

  export type Result = {
    email: string;
    name: string;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}
