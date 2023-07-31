import { Test, TestingModule } from '@nestjs/testing';
import { ValidateTransactionsOwnershipService } from './validate-transactions-ownership.service';
import { TransactionsRepository } from '../../repository';
import { TransactionResponseDto } from '../../dto';
import { NotFoundException } from '@nestjs/common';

describe('ValidateTransactionsOwnershipService', () => {
  let sut: ValidateTransactionsOwnershipService;
  let transactionRepository: TransactionsRepository;

  const transaction: TransactionResponseDto = {
    id: 'f791fb59-c696-4aa0-a472-7115a185ad25',
    value: 0,
    type: 'INCOME',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionsRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        findFirst: jest.fn().mockResolvedValue(transaction),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateTransactionsOwnershipService,
        TransactionsRepositoryProvider,
      ],
    }).compile();

    sut = module.get<ValidateTransactionsOwnershipService>(
      ValidateTransactionsOwnershipService,
    );
    transactionRepository = module.get<TransactionsRepository>(
      'TRANSACTIONS_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(transactionRepository).toBeDefined();
  });

  describe('execute()', () => {
    const transactionId = 'f791fb59-c696-4aa0-a472-7115a185ad25';
    const userId = 'f791fb59-c696-4aa0-a472-7115a185ad12';

    it('should be call transactionRepository.findFirst with correct values', async () => {
      await sut.execute(transactionId, userId);
      expect(transactionRepository.findFirst).toHaveBeenCalledTimes(1);
      expect(transactionRepository.findFirst).toHaveBeenCalledWith(
        transactionId,
        userId,
      );
    });

    it('should return an exception if transaction not found', async () => {
      jest
        .spyOn(transactionRepository, 'findFirst')
        .mockResolvedValueOnce(undefined);

      await expect(sut.execute(transactionId, userId)).rejects.toThrow(
        new NotFoundException('Transaction not found!'),
      );
    });
  });
});
