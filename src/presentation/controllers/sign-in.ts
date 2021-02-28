import { SignInService } from '@/data/services/sign-in';
import { SignIn } from '@/domain/use-cases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
} from '@/presentation/contracts';

export class SignInController implements Controller {
  constructor(private readonly signInService: SignInService) {}

  async handle(
    httpRequest: HttpRequest<SignIn.Params>
  ): Promise<HttpResponse<SignIn.Result | HttpResponseError>> {
    try {
      const { email, password } = httpRequest.body;
      const token = await this.signInService.signIn({ email, password });
      return ok(token);
    } catch (error) {
      return serverError(error);
    }
  }
}
