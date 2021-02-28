import { CreateUserService } from '@/data/services';
import { LocalMemoryUserRepository } from '@/infra/repositories';
import { BcryptEncrypter } from '@/infra/utils';
import { SignUpController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import {
  CompareFieldsValidator,
  RequiredValidator,
  EmailValidator,
  PasswordValidator,
  DateValidator,
} from '@/validation/validators';

export function buildSingUpController() {
  const localMemoryUserRepository = new LocalMemoryUserRepository();
  const bcryptEncrypter = new BcryptEncrypter();
  const createUserService = new CreateUserService(
    localMemoryUserRepository,
    bcryptEncrypter
  );
  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('email'),
    new RequiredValidator('name'),
    new RequiredValidator('birthDate'),
    new RequiredValidator('password'),
    new CompareFieldsValidator('password', 'confirmPassword'),
    new EmailValidator('email'),
    new PasswordValidator('password'),
    new DateValidator('birthDate', { past: true, parse: true }),
  ]);
  const signUpController = new SignUpController(
    createUserService,
    bodyValidator
  );
  return signUpController;
}
