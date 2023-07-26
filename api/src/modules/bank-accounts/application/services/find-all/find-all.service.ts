import { Inject, Injectable } from '@nestjs/common';
import { BankAccountWithBalanceResponseDto } from 'src/modules/bank-accounts/dtos';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import { BankAccountDto } from 'src/modules/bank-accounts/repository/dto';

@Injectable()
export class FindAllBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(id: string): Promise<BankAccountWithBalanceResponseDto[]> {
    const bankAccounts =
      await this.bankAccountsRepository.findTransactionsByUserId(id);

    return bankAccounts.map((bankAccount) =>
      this.calculateCurrentBalance(bankAccount),
    );
  }

  private calculateCurrentBalance(
    bankAccount: BankAccountDto,
  ): BankAccountWithBalanceResponseDto {
    const totalTransactions = bankAccount.transactions.reduce(
      (acc, transaction) =>
        acc +
        (transaction.type === 'INCOME'
          ? transaction.value
          : -transaction.value),
      0,
    );

    const currentBalance = bankAccount.initialBalance + totalTransactions;

    return {
      ...bankAccount,
      currentBalance,
    };
  }
}
