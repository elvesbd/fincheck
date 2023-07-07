import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';

describe('SigninService', () => {
  let sut: SigninService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SigninService],
    }).compile();

    sut = module.get<SigninService>(SigninService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
