import { UserAlreadyExistsError } from '@/domain/errors';
import { CreateUser } from '@/domain/use-cases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';
import { UserViewModel } from '@/presentation/view-models';
import { Validation } from '@/validation/contracts';

export class SignUpController implements Controller {
  constructor(
    private readonly createUserService: CreateUser,
    private readonly validator: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateUser.Params>
  ): Promise<HttpResponse<UserViewModel | HttpResponseError>> {
    try {
      const error = this.validator.validate(httpRequest.body);

      if (error) throw new BodyValidationError(error);

      const createdUser = await this.createUserService.create(httpRequest.body);

      return ok(UserViewModel.parse(createdUser));
    } catch (error) {
      if (error instanceof BodyValidationError) return badRequest(error);
      if (error instanceof UserAlreadyExistsError) return badRequest(error);
      return serverError(error);
    }
  }
}
