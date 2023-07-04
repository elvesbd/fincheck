import { Inject, Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from 'src/modules/transactions/controllers';
import { ValidateEntitiesOwnerShipService } from 'src/modules/transactions/domain/validate-entites-ownership.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { TransactionResponseDto } from 'src/modules/transactions/repository/dto/transaction-response.dto';

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
