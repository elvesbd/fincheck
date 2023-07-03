import { Inject, Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain/validate-bank-account-owner-ship.service';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/domain/validate-category-owner-ship.service';
import { CreateTransactionDto } from 'src/modules/transactions/controllers';
import { ValidateEntitiesOwnerShipService } from 'src/modules/transactions/domain/validate-entites-ownership.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';

@Injectable()
export class CreateTransactionsService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private readonly transactionRepository: TransactionsRepository,
    private readonly validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
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
