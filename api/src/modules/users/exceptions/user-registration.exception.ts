import { BadRequestException } from '@nestjs/common';

export class UserRegistrationException extends BadRequestException {
  constructor() {
    super('Unable to complete registration', UserRegistrationException.name);
  }
}
