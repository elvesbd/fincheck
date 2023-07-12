import { Inject, Injectable } from '@nestjs/common';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/controllers/update/dto/update-bank-account.dto';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/dto/bank-account-response.dto';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';

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
