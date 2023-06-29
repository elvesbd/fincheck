import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllBankAccountsService {
  execute() {
    return `This action returns all bankAccounts`;
  }
}
