import { Inject, Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain';
import {
  BankAccountResponseDto,
  UpdateBankAccountDto,
} from 'src/modules/bank-accounts/dtos';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';

@Injectable()
export class UpdateBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService,
  ) {}

  async execute(
    id: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccountResponseDto> {
    await this.validateBankAccountOwnerShipService.execute(id, userId);
    return await this.bankAccountsRepository.update(id, updateBankAccountDto);
  }
}
