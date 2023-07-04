import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from '../repository';

@Injectable()
export class ValidateTransactionsOwnershipService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  async execute(transactionId: string, userId: string): Promise<void> {
    const isOwner = await this.transactionRepository.findFirst(
      transactionId,
      userId,
    );
    if (!isOwner) throw new NotFoundException('Transaction not found!');
  }
}
