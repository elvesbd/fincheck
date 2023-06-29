import { Inject, Injectable } from '@nestjs/common';
import { BankAccountsRepository } from '../../repository/bank-accounts.interface';

@Injectable()
export class FindAllBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(id: string) {
    return await this.bankAccountsRepository.findByUserId(id);
  }
}
