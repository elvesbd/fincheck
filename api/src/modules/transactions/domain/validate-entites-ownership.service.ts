import { Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain/validate-bank-account-owner-ship.service';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/domain/validate-category-owner-ship.service';
import { ValidateEntitiesOwnerShipDto } from './dto/validate-entities-ownership.dto';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';

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
      this.validateBankAccountOwnerShipService.execute(bankAccountId, userId),
      this.validateCategoryOwnerShipService.execute(categoryId, userId),
    ]);
  }
}
