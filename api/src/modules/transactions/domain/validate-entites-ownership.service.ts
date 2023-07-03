import { Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain/validate-bank-account-owner-ship.service';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/domain/validate-category-owner-ship.service';
import { ValidateEntitiesOwnerShipDto } from './dto/validate-entities-ownership.dto';

@Injectable()
export class ValidateEntitiesOwnerShipService {
  constructor(
    private readonly validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService,
    private readonly validateCategoryOwnerShipService: ValidateCategoryOwnerShipService,
  ) {}

  async execute(
    validateEntitiesOwnerShipDto: ValidateEntitiesOwnerShipDto,
  ): Promise<void> {
    const { userId, bankAccountId, categoryId } = validateEntitiesOwnerShipDto;

    await Promise.all([
      this.validateBankAccountOwnerShipService.execute(bankAccountId, userId),
      this.validateCategoryOwnerShipService.execute(categoryId, userId),
    ]);
  }
}
