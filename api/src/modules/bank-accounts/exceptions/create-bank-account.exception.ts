import { BadRequestException } from '@nestjs/common';

export class CreateBankAccountException extends BadRequestException {
  constructor() {
    super('Unable to create a bank account', CreateBankAccountException.name);
  }
}
