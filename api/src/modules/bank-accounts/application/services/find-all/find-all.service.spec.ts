import { Test, TestingModule } from '@nestjs/testing';
import { FindAllBankAccountsService } from './find-all.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/dtos';

describe('FindAllBankAccountsService', () => {
  let sut: FindAllBankAccountsService;
  let bankAccountsRepository: BankAccountsRepository;

  const bankAccount: BankAccountResponseDto = {
    id: '5a0aad08-17ce-447f-922c-b8d3806d6292',
    userId: '7b0aad08-17ce-447f-922c-b8d3806d5918',
    name: 'Elvis Presley',
    initialBalance: 0,
    type: 'INCOME',
    color: '#CCCCCC',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvider = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        findTransactionsByUserId: jest.fn().mockResolvedValue([bankAccount]),
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
});
