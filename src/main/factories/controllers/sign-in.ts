import { SignInService } from '@/data/services';
import { LocalMemoryUserRepository } from '@/infra/repositories';
import { BcryptEncrypter, JWTHasher } from '@/infra/utils';
import { SignInController } from '@/presentation/controllers';

export function buildSignInController() {
  const userRepository = new LocalMemoryUserRepository();
  const encrypter = new BcryptEncrypter();
  const hasher = new JWTHasher();

  const signInService = new SignInService(userRepository, encrypter, hasher);

  const controller = new SignInController(signInService);
  return controller;
}
