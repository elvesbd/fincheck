import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBankAccountsService } from './update.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain';

describe('UpdateBankAccountsService', () => {
  let sut: UpdateBankAccountsService;
  let bankAccountsRepository: BankAccountsRepository;
  let validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvider = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        remove: jest.fn().mockResolvedValue(void 0),
      },
    };

    const ValidateBankAccountOwnerShipServiceProvider = {
      provide: ValidateBankAccountOwnerShipService,
      useValue: {
        update: jest.fn().mockResolvedValue(void 0),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBankAccountsService,
        BankAccountsRepositoryProvider,
        ValidateBankAccountOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<UpdateBankAccountsService>(UpdateBankAccountsService);
    bankAccountsRepository = module.get<BankAccountsRepository>(
      'BANK_ACCOUNTS_REPOSITORY',
    );
    validateBankAccountOwnerShipService =
      module.get<ValidateBankAccountOwnerShipService>(
        ValidateBankAccountOwnerShipService,
      );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(bankAccountsRepository).toBeDefined();
    expect(validateBankAccountOwnerShipService).toBeDefined();
  });
});
