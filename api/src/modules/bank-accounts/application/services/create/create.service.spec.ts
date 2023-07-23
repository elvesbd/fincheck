import { Test, TestingModule } from '@nestjs/testing';
import { CreateBankAccountsService } from './create.service';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/dto/bank-account-response.dto';
import { BankAccountDataBuilder } from 'src/modules/bank-accounts/__mocks__/data-builder';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/controllers/create/dto/create-bank-account.dto';
import { BankAccountType } from 'src/modules/bank-accounts/enums/type.enum';
import { CreateBankAccountException } from 'src/modules/bank-accounts/exceptions';

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

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86816c';
    const createBankAccountDto: CreateBankAccountDto = {
      name: 'Ebd Bank',
      initialBalance: 0,
      type: BankAccountType.CASH,
      color: '#FFF',
    };

    it('should return an exception if bank account not created', async () => {
      jest.spyOn(bankAccountsRepository, 'create').mockResolvedValueOnce(null);
      await expect(sut.execute(id, createBankAccountDto)).rejects.toThrow(
        new CreateBankAccountException(),
      );
    });

    it('should return an bank account created on success', async () => {
      const result = await sut.execute(id, createBankAccountDto);
      expect(result).toStrictEqual(bankAccount);
    });
  });
});
