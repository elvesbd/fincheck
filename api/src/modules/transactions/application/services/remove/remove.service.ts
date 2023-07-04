import { Inject, Injectable } from '@nestjs/common';
import { ValidateEntitiesOwnerShipService } from 'src/modules/transactions/domain/validate-entites-ownership.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';

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
