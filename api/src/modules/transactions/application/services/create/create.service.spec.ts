import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionsService } from './create.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { ValidateEntitiesOwnerShipService } from '../../domain';
import { TransactionDataBuilder } from 'src/modules/transactions/__mocks__/transaction-builder';
import { CreateTransactionDto } from 'src/modules/transactions/controllers';
import { TransactionType } from 'src/modules/transactions/enum';

describe('CreateTransactionsService', () => {
  let sut: CreateTransactionsService;
  let transactionRepository: TransactionsRepository;
  let validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService;

  const transaction = TransactionDataBuilder.aTransaction().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionsRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        create: jest.fn().mockResolvedValue(transaction),
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
        CreateTransactionsService,
        TransactionsRepositoryProvider,
        ValidateEntitiesOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<CreateTransactionsService>(CreateTransactionsService);
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

  describe('execute', () => {
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';
    const createTransactionDto: CreateTransactionDto = {
      bankAccountId: 'b013f8f4-804e-4816-b799-46044d86832a',
      categoryId: 'f791fb59-c696-4aa0-a472-7115a185ad49',
      name: 'Água',
      value: 200,
      date: '2023-08-17T13:13:11.207Z',
      type: TransactionType.EXPENSE,
    };
    const { bankAccountId, categoryId } = createTransactionDto;

    it('should be called validateEntitiesOwnerShipService.execute with correct value', async () => {
      await sut.execute(userId, createTransactionDto);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledTimes(1);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledWith({
        userId,
        bankAccountId,
        categoryId,
      });
    });
  });
});
