import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailService } from './get-by-email.service';

describe('GetUserByEmailService', () => {
  let sut: GetUserByEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByEmailService],
    }).compile();

    sut = module.get<GetUserByEmailService>(GetUserByEmailService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
