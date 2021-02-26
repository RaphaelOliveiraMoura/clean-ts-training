import { CreateUserService } from '@/data/services';
import { LocalMemoryUserRepository } from '@/infra/repositories';
import { SignUpController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import {
  CompareFieldsValidator,
  RequiredValidator,
  EmailValidator,
  PasswordValidator,
} from '@/validation/validators';

export class SignUpControllerFactory {
  static build() {
    const localMemoryUserRepository = new LocalMemoryUserRepository();
    const createUserService = new CreateUserService(localMemoryUserRepository);
    const bodyValidator = new ValidatorComposite([
      new RequiredValidator('email'),
      new RequiredValidator('name'),
      new RequiredValidator('birthDate'),
      new RequiredValidator('password'),
      new CompareFieldsValidator('password', 'confirmPassword'),
      new EmailValidator('email'),
      new PasswordValidator('password'),
    ]);
    const signUpController = new SignUpController(
      createUserService,
      bodyValidator
    );
    return signUpController;
  }
}
