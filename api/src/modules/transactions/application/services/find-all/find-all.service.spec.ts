import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTransactionsService } from './find-all.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { TransactionDataBuilder } from 'src/modules/transactions/__mocks__/transaction-builder';
import { FiltersDto } from 'src/modules/transactions/controllers/find-all/dto/filters.dto';

describe('FindAllTransactionsService', () => {
  let sut: FindAllTransactionsService;
  let transactionRepository: TransactionsRepository;

  const transaction = TransactionDataBuilder.aTransaction().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        findAll: jest.fn().mockResolvedValue([transaction]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllTransactionsService, TransactionRepositoryProvider],
    }).compile();

    sut = module.get<FindAllTransactionsService>(FindAllTransactionsService);
    transactionRepository = module.get<TransactionsRepository>(
      'TRANSACTIONS_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  describe('execute()', () => {});
});
