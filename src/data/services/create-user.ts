import { UserRepository } from '@/data/contracts';
import { UserAlreadyExistsError } from '@/domain/errors';
import { CreateUser } from '@/domain/use-cases';

export class CreateUserService implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userParams: CreateUser.Params): Promise<CreateUser.Result> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      userParams.email
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const createdUser = await this.userRepository.create(userParams);
    return createdUser;
  }
}
