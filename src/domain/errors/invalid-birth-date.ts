import { CustomError } from '@/utils';

export class InvalidBirthDateError extends CustomError {
  constructor() {
    super(InvalidBirthDateError, 'InvalidBirthDateError');
  }
}
