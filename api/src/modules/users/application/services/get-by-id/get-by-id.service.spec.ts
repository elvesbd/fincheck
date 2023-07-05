import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdService } from './get-by-id.service';

describe('GetUserByIdService', () => {
  let sut: GetUserByIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByIdService],
    }).compile();

    sut = module.get<GetUserByIdService>(GetUserByIdService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
