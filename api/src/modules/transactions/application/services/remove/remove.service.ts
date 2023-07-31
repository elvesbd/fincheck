import { Inject, Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { ValidateEntitiesOwnerShipService } from '../../domain';

@Injectable()
export class RemoveTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
    private readonly validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService,
  ) {}

  async execute(transactionId: string, userId: string) {
    await this.validateEntitiesOwnerShipService.execute({
      userId,
      transactionId,
    });

    await this.transactionRepository.remove(transactionId);
  }
}
