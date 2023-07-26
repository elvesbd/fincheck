import { Test, TestingModule } from '@nestjs/testing';
import { RemoveBankAccountsService } from './remove.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import { ValidateBankAccountOwnerShipService } from 'src/modules/bank-accounts/domain';

describe('RemoveBankAccountsService', () => {
  let sut: RemoveBankAccountsService;
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
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveBankAccountsService,
        BankAccountsRepositoryProvider,
        ValidateBankAccountOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<RemoveBankAccountsService>(RemoveBankAccountsService);
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

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86832a';
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';

    it('should call validateBankAccountOwnerShipService.execute with the correct parameters', async () => {
      await sut.execute(id, userId);

      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledTimes(
        1,
      );
      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledWith(
        id,
        userId,
      );
    });
  });
});
