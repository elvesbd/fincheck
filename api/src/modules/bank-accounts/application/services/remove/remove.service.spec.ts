import { Test, TestingModule } from '@nestjs/testing';
import { RemoveBankAccountsService } from './remove.service';

describe('RemoveBankAccountsService', () => {
  let sut: RemoveBankAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveBankAccountsService],
    }).compile();

    sut = module.get<RemoveBankAccountsService>(RemoveBankAccountsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
