import { Inject, Injectable } from '@nestjs/common';
import { FiltersDto } from 'src/modules/transactions/controllers/find-all/dto/filters.dto';
import { TransactionsRepository } from 'src/modules/transactions/repository';

@Injectable()
export class FindAllTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  async findAll(userId: string, filters: FiltersDto) {
    return await this.transactionRepository.findAll(userId, filters);
  }
}
