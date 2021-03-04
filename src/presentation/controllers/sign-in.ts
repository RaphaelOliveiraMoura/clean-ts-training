import { BodyValidationError } from '../errors';

import { SignInService } from '@/data/services/sign-in';
import { SignIn } from '@/domain/use-cases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
} from '@/presentation/contracts';
import { Validation } from '@/validation/contracts';

export class SignInController implements Controller {
  constructor(
    private readonly signInService: SignInService,
    private readonly validator: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<SignIn.Params>
  ): Promise<HttpResponse<SignIn.Result | HttpResponseError>> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) throw new BodyValidationError(error);

      const { email, password } = httpRequest.body;
      const token = await this.signInService.signIn({ email, password });
      return ok(token);
    } catch (error) {
      if (error instanceof BodyValidationError) return badRequest(error);
      return serverError(error);
    }
  }
}
