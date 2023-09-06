import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionsService } from './update.service';
import { ValidateEntitiesOwnerShipService } from '../../domain';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { TransactionDataBuilder } from 'src/modules/transactions/__mocks__/transaction-builder';
import { UpdateTransactionDto } from 'src/modules/transactions/controllers';

describe('UpdateTransactionsService', () => {
  let sut: UpdateTransactionsService;
  let transactionRepository: TransactionsRepository;
  let validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService;

  const transaction = TransactionDataBuilder.aTransaction().build();
  const transactionUpdated = TransactionDataBuilder.aTransaction()
    .updated()
    .build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionsRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        update: jest.fn().mockResolvedValue(transactionUpdated),
      },
    };

    const ValidateEntitiesOwnerShipServiceProvider = {
      provide: ValidateEntitiesOwnerShipService,
      useValue: {
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateTransactionsService,
        TransactionsRepositoryProvider,
        ValidateEntitiesOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<UpdateTransactionsService>(UpdateTransactionsService);
    transactionRepository = module.get<TransactionsRepository>(
      'TRANSACTIONS_REPOSITORY',
    );
    validateEntitiesOwnerShipService =
      module.get<ValidateEntitiesOwnerShipService>(
        ValidateEntitiesOwnerShipService,
      );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(transactionRepository).toBeDefined();
    expect(validateEntitiesOwnerShipService).toBeDefined();
  });

  describe('execute()', () => {
    const transactionId = transaction.id;
    const userId = transaction.userId;
    const updateTransactionDto: UpdateTransactionDto = {
      bankAccountId: transaction.bankAccountId,
      categoryId: transaction.categoryId,
      name: 'Internet',
      value: 100,
      date: new Date('2023-08-17T13:20:11.207Z'),
      type: 'EXPENSE',
    };
    const { bankAccountId, categoryId } = updateTransactionDto;

    it('should be called validateEntitiesOwnerShipService.execute with correct values', async () => {
      await sut.execute(transactionId, userId, updateTransactionDto);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledTimes(1);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledWith({
        userId,
        bankAccountId,
        categoryId,
        transactionId,
      });
    });

    it('should be return an transaction updated on success', async () => {
      const result = await sut.execute(
        transactionId,
        userId,
        updateTransactionDto,
      );
      expect(result).toStrictEqual(transactionUpdated);
    });
  });
});
