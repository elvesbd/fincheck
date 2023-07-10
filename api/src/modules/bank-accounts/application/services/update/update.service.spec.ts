import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBankAccountsService } from './update.service';

describe('UpdateBankAccountsService', () => {
  let sut: UpdateBankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateBankAccountsService],
    }).compile();

    sut = module.get<UpdateBankAccountsService>(UpdateBankAccountsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
