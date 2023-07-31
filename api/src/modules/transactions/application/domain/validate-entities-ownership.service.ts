import { Injectable } from '@nestjs/common';
import { ValidateEntitiesOwnerShipDto } from './dto/validate-entities-ownership.dto';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/application/domain';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/application/domain';

@Injectable()
export class ValidateEntitiesOwnerShipService {
  constructor(
    private readonly validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService,
    private readonly validateCategoryOwnerShipService: ValidateCategoryOwnerShipService,
    private readonly validateTransactionsOwnershipService: ValidateTransactionsOwnershipService,
  ) {}

  async execute(
    validateEntitiesOwnerShipDto: ValidateEntitiesOwnerShipDto,
  ): Promise<void> {
    const { userId, bankAccountId, categoryId, transactionId } =
      validateEntitiesOwnerShipDto;

    await Promise.all([
      transactionId &&
        this.validateTransactionsOwnershipService.execute(
          transactionId,
          userId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnerShipService.execute(bankAccountId, userId),
      categoryId &&
        this.validateCategoryOwnerShipService.execute(categoryId, userId),
    ]);
  }
}
