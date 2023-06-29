import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from '../repository/bank-accounts.interface';

@Injectable()
export class ValidateBankAccountOwnerShipService {
  constructor(
    @Inject('BANK_ACCOUNTS_REPOSITORY')
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const isOwner = await this.bankAccountsRepository.findOneByIdAndUserId(
      id,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
