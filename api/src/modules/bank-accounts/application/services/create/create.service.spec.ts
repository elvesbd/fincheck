import { Test, TestingModule } from '@nestjs/testing';
import { CreateBankAccountsService } from './create.service';

describe('CreateBankAccountsService', () => {
  let sut: CreateBankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBankAccountsService],
    }).compile();

    sut = module.get<CreateBankAccountsService>(CreateBankAccountsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
