import { Inject, Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/modules/transactions/repository';

@Injectable()
export class FindAllTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  async findAll(userId: string) {
    return await this.transactionRepository.findAll(userId);
  }
}
