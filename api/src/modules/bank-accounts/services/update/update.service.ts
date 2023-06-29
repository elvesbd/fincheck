import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBankAccountDto } from '../../controllers/update/dto/update-bank-account.dto';
import { BankAccountsRepository } from '../../repository/bank-accounts.interface';

@Injectable()
export class UpdateBankAccountsService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const isOwner = await this.bankAccountsRepository.findOneByIdAndUserId(
      id,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }

    return await this.bankAccountsRepository.update(id, updateBankAccountDto);
  }
}
