import { Test, TestingModule } from '@nestjs/testing';
import { CreateBankAccountsService } from './create.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/dto/bank-account-response.dto';
import { BankAccountDataBuilder } from 'src/modules/bank-accounts/__mocks__/data-builder';

describe('CreateBankAccountsService', () => {
  let sut: CreateBankAccountsService;
  let bankAccountsRepository: BankAccountsRepository;

  const bankAccount: BankAccountResponseDto =
    BankAccountDataBuilder.aBankAccount().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvider = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        create: jest.fn().mockResolvedValue(bankAccount),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBankAccountsService, BankAccountsRepositoryProvider],
    }).compile();

    sut = module.get<CreateBankAccountsService>(CreateBankAccountsService);
    bankAccountsRepository = module.get<BankAccountsRepository>(
      'BANK_ACCOUNTS_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(bankAccountsRepository).toBeDefined();
  });
});
