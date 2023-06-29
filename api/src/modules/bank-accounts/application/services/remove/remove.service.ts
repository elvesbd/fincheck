import { Inject, Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain/validate-bank-account-owner-ship.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';

@Injectable()
export class RemoveBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    await this.validateBankAccountOwnerShipService.execute(id, userId);
    return this.bankAccountsRepository.remove(id);
  }
}
