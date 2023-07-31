import { Inject, Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from 'src/modules/transactions/controllers';
import { TransactionResponseDto } from 'src/modules/transactions/dto';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { ValidateEntitiesOwnerShipService } from '../../domain';

@Injectable()
export class UpdateTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
    private readonly validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService,
  ) {}

  async update(
    transactionId: string,
    userId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const { bankAccountId, categoryId } = updateTransactionDto;
    await this.validateEntitiesOwnerShipService.execute({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return await this.transactionRepository.update(
      transactionId,
      updateTransactionDto,
    );
  }
}
