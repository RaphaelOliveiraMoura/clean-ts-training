import { InvalidBirthDateError } from '../errors/invalid-birth-date';

import { Validation } from '@/validation/contracts';
import { DateValidator } from '@/validation/validators';

type UserConstructor = {
  id: number;
  email: string;
  name: string;
  birthDate: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  id: number;

  email: string;

  name: string;

  birthDate: Date;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  private birthDateValidator: Validation;

  constructor(params: UserConstructor) {
    Object.assign(this, params);

    this.birthDateValidator = new DateValidator('birthDate', { past: true });
    this.validateBirthDate();
  }

  private validateBirthDate(): null {
    const error = this.birthDateValidator.validate({
      birthDate: this.birthDate,
    });

    if (error) throw new InvalidBirthDateError();

    return null;
  }
}
