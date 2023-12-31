import { Test, TestingModule } from '@nestjs/testing';
import { ValidateBankAccountOwnerShipService } from './validate-bank-account-owner-ship.service';
import { NotFoundException } from '@nestjs/common';
import { BankAccountDataBuilder } from '../../__mocks__/bank-account-builder';
import { BankAccountResponseDto } from '../../dtos';
import { BankAccountsRepository } from '../../repository';

describe('ValidateBankAccountOwnerShipService', () => {
  let sut: ValidateBankAccountOwnerShipService;
  let bankAccountsRepository: BankAccountsRepository;

  const bankAccount: BankAccountResponseDto =
    BankAccountDataBuilder.aBankAccount().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const BankAccountsRepositoryProvide = {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useValue: {
        findOneByIdAndUserId: jest.fn().mockResolvedValue(bankAccount),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateBankAccountOwnerShipService,
        BankAccountsRepositoryProvide,
      ],
    }).compile();

    sut = module.get<ValidateBankAccountOwnerShipService>(
      ValidateBankAccountOwnerShipService,
    );
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
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';

    it('should be call bankAccountsRepository.findOneByIdAndUserId with correct values', async () => {
      await sut.execute(id, userId);
      expect(bankAccountsRepository.findOneByIdAndUserId).toHaveBeenCalledTimes(
        1,
      );
      expect(bankAccountsRepository.findOneByIdAndUserId).toHaveBeenCalledWith(
        id,
        userId,
      );
    });

    it('should be return an exception if category not found', async () => {
      jest
        .spyOn(bankAccountsRepository, 'findOneByIdAndUserId')
        .mockResolvedValueOnce(undefined);

      await expect(sut.execute(id, userId)).rejects.toThrow(
        new NotFoundException('Bank account not found'),
      );
    });
  });
});
