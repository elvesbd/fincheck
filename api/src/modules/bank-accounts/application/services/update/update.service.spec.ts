import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBankAccountsService } from './update.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository';
import {
  BankAccountResponseDto,
  UpdateBankAccountDto,
} from 'src/modules/bank-accounts/dtos';
import { BankAccountDataBuilder } from 'src/modules/bank-accounts/__mocks__/bank-account-builder';
import { ValidateBankAccountOwnerShipService } from '../../domain';

describe('UpdateBankAccountsService', () => {
  let sut: UpdateBankAccountsService;
  let bankAccountsRepository: BankAccountsRepository;
  let validateBankAccountOwnerShipService: ValidateBankAccountOwnerShipService;

  const bankAccount: BankAccountResponseDto =
    BankAccountDataBuilder.aBankAccount().build();

  const bankAccountWithUpdate = BankAccountDataBuilder.aBankAccount()
    .withUpdates()
    .build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvider = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        update: jest.fn().mockResolvedValue(bankAccount),
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

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86832a';
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';
    const updateBankAccountDto: UpdateBankAccountDto = {
      name: 'Ebd Bank',
      initialBalance: 2000,
      type: 'CHECKING',
      color: '#777777',
    };

    it('should call validateBankAccountOwnerShipService.execute with the correct parameters', async () => {
      await sut.execute(id, userId, updateBankAccountDto);

      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledTimes(
        1,
      );
      expect(validateBankAccountOwnerShipService.execute).toHaveBeenCalledWith(
        id,
        userId,
      );
    });

    it('should call bankAccountsRepository.remove with the correct parameters', async () => {
      await sut.execute(id, userId, updateBankAccountDto);

      expect(bankAccountsRepository.update).toHaveBeenCalledTimes(1);
      expect(bankAccountsRepository.update).toHaveBeenCalledWith(
        id,
        updateBankAccountDto,
      );
    });

    it('should return an bank account updated', async () => {
      jest
        .spyOn(bankAccountsRepository, 'update')
        .mockResolvedValueOnce(bankAccountWithUpdate);

      const result = await sut.execute(id, userId, updateBankAccountDto);
      expect(result).toStrictEqual(bankAccountWithUpdate);
    });
  });
});
