import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactionsService } from './update.service';

describe('UpdateTransactionsService', () => {
  let sut: UpdateTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTransactionsService],
    }).compile();

    sut = module.get<UpdateTransactionsService>(UpdateTransactionsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
