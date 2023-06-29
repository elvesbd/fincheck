import { Inject, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/controllers/create/dto/create-bank-account.dto';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';

@Injectable()
export class CreateBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(id: string, createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountsRepository.create(id, createBankAccountDto);
  }
}
