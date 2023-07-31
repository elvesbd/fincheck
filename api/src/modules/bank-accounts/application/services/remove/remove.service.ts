import { Inject, Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import { ValidateBankAccountOwnerShipService } from '../../domain';

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
