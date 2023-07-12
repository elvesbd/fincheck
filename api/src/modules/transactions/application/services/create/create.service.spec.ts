import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionsService } from './create.service';

describe('CreateTransactionsService', () => {
  let sut: CreateTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTransactionsService],
    }).compile();

    sut = module.get<CreateTransactionsService>(CreateTransactionsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
