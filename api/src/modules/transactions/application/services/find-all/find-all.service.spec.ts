import { Test, TestingModule } from '@nestjs/testing';
import { FindAllTransactionsService } from './find-all.service';

describe('FindAllTransactionsService', () => {
  let sut: FindAllTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllTransactionsService],
    }).compile();

    sut = module.get<FindAllTransactionsService>(FindAllTransactionsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
