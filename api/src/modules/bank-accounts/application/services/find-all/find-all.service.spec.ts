import { Test, TestingModule } from '@nestjs/testing';
import { FindAllBankAccountsService } from './find-all.service';

describe('FindAllBankAccountsService', () => {
  let sut: FindAllBankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllBankAccountsService],
    }).compile();

    sut = module.get<FindAllBankAccountsService>(FindAllBankAccountsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
