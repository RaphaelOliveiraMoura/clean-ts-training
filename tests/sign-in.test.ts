import supertest from 'supertest';

import { BcryptEncrypter } from '@/infra/utils';
import app from '@/main/app';
import { UserBuilder } from '@/tests/builders';
import { UserRepository } from '@/tests/repositories';

const userRepository = new UserRepository();
const encrypter = new BcryptEncrypter();

describe('SignIn', () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  test('should sign in when pass correct credentials', async () => {
    const initialUsersCount = await userRepository.count();
    expect(initialUsersCount).toBe(0);

    const user = new UserBuilder({}).build({ excludeProps: ['id'] });
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
