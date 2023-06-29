import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveBankAccountsService {
  execute(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
