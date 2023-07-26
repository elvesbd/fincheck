import { Test, TestingModule } from '@nestjs/testing';
import { FindAllBankAccountsService } from './find-all.service';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/dtos';
import { BankAccountDataBuilder } from 'src/modules/bank-accounts/__mocks__/data-builder';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import { BankAccountDto } from 'src/modules/bank-accounts/repository/dto';

describe('FindAllBankAccountsService', () => {
  let sut: FindAllBankAccountsService;
  let bankAccountsRepository: BankAccountsRepository;

  const bankAccount: BankAccountResponseDto =
    BankAccountDataBuilder.aBankAccount().build();
  const bankAccounts: BankAccountDto = {
    ...bankAccount,
    transactions: [
      {
        id: 'a213f8f4-804e-4816-b799-46044d78551a',
        type: 'INCOME',
        value: 1000,
      },
    ],
  };

  const bankAccountWithInitialBalance: BankAccountResponseDto =
    BankAccountDataBuilder.aBankAccount().withInitialBalance().build();
  const bankAccountsWithInitialBalance: BankAccountDto = {
    ...bankAccountWithInitialBalance,
    transactions: [
      {
        id: 'b172f8f4-804e-4816-b799-46122d86825c',
        type: 'EXPENSE',
        value: 500,
      },
    ],
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvider = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        findTransactionsByUserId: jest.fn().mockResolvedValue([bankAccounts]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllBankAccountsService, BankAccountsRepositoryProvider],
    }).compile();

    sut = module.get<FindAllBankAccountsService>(FindAllBankAccountsService);
    bankAccountsRepository = module.get<BankAccountsRepository>(
      'BANK_ACCOUNTS_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(bankAccountsRepository).toBeDefined();
  });

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86832a';

    it('should call bankAccountsRepository.findTransactionsByUserId with the correct parameter', async () => {
      await sut.execute(id);
      expect(
        bankAccountsRepository.findTransactionsByUserId,
      ).toHaveBeenCalledTimes(1);
      expect(
        bankAccountsRepository.findTransactionsByUserId,
      ).toHaveBeenCalledWith(id);
    });

    it('should return a bank account with the current balance calculated when there are EXPENSE type transactions', async () => {
      jest
        .spyOn(bankAccountsRepository, 'findTransactionsByUserId')
        .mockResolvedValueOnce([bankAccountsWithInitialBalance]);

      const result = await sut.execute(id);
      expect(result[0].currentBalance).toBe(500);
    });

    it('should return a bank account with the current balance calculated when there are INCOME type transactions', async () => {
      const result = await sut.execute(id);
      expect(result[0].currentBalance).toBe(1000);
    });
  });
});
