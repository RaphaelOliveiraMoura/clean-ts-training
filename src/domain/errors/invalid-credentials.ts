import { CustomError } from '@/utils';

export class InvalidCredentialsError extends CustomError {
  constructor() {
    super(InvalidCredentialsError, 'InvalidCredentialsError');
  }
}
