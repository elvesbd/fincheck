import { Test, TestingModule } from '@nestjs/testing';
import { RemoveTransactionsService } from './remove.service';

describe('RemoveTransactionsService', () => {
  let sut: RemoveTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveTransactionsService],
    }).compile();

    sut = module.get<RemoveTransactionsService>(RemoveTransactionsService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
