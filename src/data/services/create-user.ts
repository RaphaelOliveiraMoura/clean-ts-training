import { Encrypter, UserRepository } from '@/data/contracts';
import { UserAlreadyExistsError } from '@/domain/errors';
import { CreateUser } from '@/domain/use-cases';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) {}

  async create(userParams: CreateUser.Params): Promise<CreateUser.Result> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      userParams.email
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const encryptedPassword = await this.encrypter.encrypt(userParams.password);

    const user = {
      ...userParams,
      password: encryptedPassword,
    };

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}
