import { Inject, Injectable } from '@nestjs/common';
import { BankAccountWithBalanceResponseDto } from 'src/modules/bank-accounts/controllers/find-all/dto/bank-account-with-balance-response.dto';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';
import { BankAccountDto } from 'src/modules/bank-accounts/repository/dto/bank-account.dto';

@Injectable()
export class FindAllBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(id: string): Promise<BankAccountWithBalanceResponseDto[]> {
    const bankAccounts =
      await this.bankAccountsRepository.findTransactionsByUserIdAndAccountId(
        id,
      );

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
