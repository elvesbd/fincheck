import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCategoriesByUserIdService } from './find-all-by-user-id.service';

describe('FindAllCategoriesByUserIdService', () => {
  let service: FindAllCategoriesByUserIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCategoriesByUserIdService],
    }).compile();

    service = module.get<FindAllCategoriesByUserIdService>(
      FindAllCategoriesByUserIdService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
