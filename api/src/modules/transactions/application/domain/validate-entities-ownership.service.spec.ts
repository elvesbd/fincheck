import { Test, TestingModule } from '@nestjs/testing';
import { ValidateEntitiesOwnerShipService } from './validate-entities-ownership.service';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/application/domain';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/application/domain';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';
import { ValidateEntitiesOwnerShipDto } from './dto/validate-entities-ownership.dto';

describe('ValidateEntitiesOwnerShipService', () => {
  let sut: ValidateEntitiesOwnerShipService;
  let validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService;
  let validateCategoryOwnerShipService: ValidateCategoryOwnerShipService;
  let validateTransactionsOwnershipService: ValidateTransactionsOwnershipService;

  const validateEntitiesOwnerShipDto: ValidateEntitiesOwnerShipDto = {
    userId: 'f791fb59-c696-4aa0-a472-7115a185ad12',
    bankAccountId: '',
    categoryId: '',
    transactionId: '',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const ValidateBankAccountOwnerShipServiceProvider = {
      provide: ValidateBankAccountOwnerShipService,
      useValue: {
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const ValidateCategoryOwnerShipServiceProvider = {
      provide: ValidateCategoryOwnerShipService,
      useValue: {
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const ValidateTransactionsOwnershipServiceProvider = {
      provide: ValidateTransactionsOwnershipService,
      useValue: {
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateEntitiesOwnerShipService,
        ValidateBankAccountOwnerShipServiceProvider,
        ValidateCategoryOwnerShipServiceProvider,
        ValidateTransactionsOwnershipServiceProvider,
      ],
    }).compile();

    sut = module.get<ValidateEntitiesOwnerShipService>(
      ValidateEntitiesOwnerShipService,
    );
    validateBankAccountOwnerShipService =
      module.get<ValidateBankAccountOwnerShipService>(
        ValidateBankAccountOwnerShipService,
      );
    validateCategoryOwnerShipService =
      module.get<ValidateCategoryOwnerShipService>(
        ValidateCategoryOwnerShipService,
      );
    validateTransactionsOwnershipService =
      module.get<ValidateTransactionsOwnershipService>(
        ValidateTransactionsOwnershipService,
      );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(validateBankAccountOwnerShipService).toBeDefined();
    expect(validateCategoryOwnerShipService).toBeDefined();
    expect(validateTransactionsOwnershipService).toBeDefined();
  });

  describe('execute()', () => {
    it('should be call validateTransactionsOwnershipService.execute with correct values', async () => {
      const transactionId = (validateEntitiesOwnerShipDto.transactionId =
        'f791fb59-c696-4aa0-a472-7115a185ad25');
      await sut.execute(validateEntitiesOwnerShipDto);
      expect(
        validateTransactionsOwnershipService.execute,
      ).toHaveBeenCalledTimes(1);
      expect(validateTransactionsOwnershipService.execute).toHaveBeenCalledWith(
        transactionId,
        validateEntitiesOwnerShipDto.userId,
      );
    });

    it('should be call validateBankAccountOwnerShipService.execute with correct values', async () => {
      const bankAccountId = (validateEntitiesOwnerShipDto.bankAccountId =
        'f791fb59-c696-4aa0-a472-7115a185ad66');
      await sut.execute(validateEntitiesOwnerShipDto);
      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledTimes(
        1,
      );
      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledWith(
        bankAccountId,
        validateEntitiesOwnerShipDto.userId,
      );
    });

    it('should be call validateCategoryOwnerShipService.execute with correct values', async () => {
      const categoryId = (validateEntitiesOwnerShipDto.categoryId =
        'f791fb59-c696-4aa0-a472-7115a185ad49');
      await sut.execute(validateEntitiesOwnerShipDto);
      expect(validateCategoryOwnerShipService.execute).toHaveBeenCalledTimes(1);
      expect(validateCategoryOwnerShipService.execute).toHaveBeenCalledWith(
        categoryId,
        validateEntitiesOwnerShipDto.userId,
      );
    });
  });
});
