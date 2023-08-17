import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTransactionsService } from './find-all.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { TransactionDataBuilder } from 'src/modules/transactions/__mocks__/transaction-builder';
import { FiltersDto } from 'src/modules/transactions/controllers/find-all/dto/filters.dto';

describe('FindAllTransactionsService', () => {
  let sut: FindAllTransactionsService;
  let transactionRepository: TransactionsRepository;

  const transaction = TransactionDataBuilder.aTransaction().build();
  const transactionWithDifferentAccount = TransactionDataBuilder.aTransaction()
    .withDifferentBankAccountId()
    .build();

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

  describe('execute()', () => {
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';
    const filters: FiltersDto = {
      month: 8,
      year: 2023,
    };

    it('should be called transactionRepository.findAll with correct values', async () => {
      await sut.execute(userId, filters);
      expect(transactionRepository.findAll).toHaveBeenCalledTimes(1);
      expect(transactionRepository.findAll).toHaveBeenCalledWith(
        userId,
        filters,
      );
    });

    it('ensures be returns transactions according to the month and year informed in the filter', async () => {
      const result = await sut.execute(userId, filters);
      expect(result[0].date.getMonth() + 1).toBe(filters.month);
      expect(result[0].date.getFullYear()).toBe(filters.year);
    });

    it('ensures be returns transactions according to the bank account id informed in the filter', async () => {
      filters.bankAccountId = 'a540f8f4-804e-4816-b799-46044d86851c';

      jest
        .spyOn(transactionRepository, 'findAll')
        .mockResolvedValueOnce([transactionWithDifferentAccount]);

      const result = await sut.execute(userId, filters);
      expect(result).toStrictEqual([transactionWithDifferentAccount]);
    });
  });
});
