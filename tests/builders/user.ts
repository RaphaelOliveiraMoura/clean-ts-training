import faker from 'faker';

type User = {
  id: number;
  email: string;
  name: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

type BuildOptions = {
  excludeProps: string[];
};

export class UserBuilder {
  user: User;

  constructor({
    id = faker.random.number(),
    name = faker.name.firstName(),
    email = faker.internet.email(),
    password = `5${faker.internet.password(8, false, /[a-z]/)}`,
    birthDate = faker.date.past().toISOString(),
  }: Partial<User>) {
    this.user = {
      id,
      name,
      email,
      password,
      confirmPassword: password,
      birthDate,
    };
  }

  build({ excludeProps }: BuildOptions) {
    excludeProps.forEach((prop) => delete this.user[prop]);
    return this.user;
  }
}
