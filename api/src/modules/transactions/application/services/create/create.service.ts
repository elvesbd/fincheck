import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/controllers';
import { ValidateEntitiesOwnerShipService } from 'src/modules/transactions/domain/validate-entites-ownership.service';
import { TransactionResponseDto } from 'src/modules/transactions/dto';
import { TransactionsRepository } from 'src/modules/transactions/repository';

@Injectable()
export class CreateTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
    private readonly validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService,
  ) {}

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const { bankAccountId, categoryId } = createTransactionDto;

    await this.validateEntitiesOwnerShipService.execute({
      userId,
      bankAccountId,
      categoryId,
    });

    return await this.transactionRepository.create(
      userId,
      createTransactionDto,
    );
  }
}
