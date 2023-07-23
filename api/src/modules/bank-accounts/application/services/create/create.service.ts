import { Inject, Injectable } from '@nestjs/common';
import {
  CreateBankAccountDto,
  BankAccountResponseDto,
} from 'src/modules/bank-accounts/dtos';
import { CreateBankAccountException } from 'src/modules/bank-accounts/exceptions';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';

@Injectable()
export class CreateBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(
    id: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountResponseDto> {
    const bankAccount = await this.bankAccountsRepository.create(
      id,
      createBankAccountDto,
    );
    if (!bankAccount) throw new CreateBankAccountException();

    return bankAccount;
  }
}
