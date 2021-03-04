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

  test('should return 400 when not pass email', async () => {
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
      .send({ password: user.password });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'email is required' });
  });

  test('should return 400 when not pass password', async () => {
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
      .send({ email: user.email });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'password is required' });
  });

  test('should return 400 when pass invalid email', async () => {
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
      .send({ email: 'invalid_email', password: user.password });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'email is invalid' });
  });

  test('should return 400 when pass invalid password', async () => {
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
      .send({ email: user.email, password: 'invalid_password' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        'password need have minimum eight characters and at least one letter and one number',
    });
  });
});
