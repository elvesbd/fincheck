import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let sut: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignupService],
    }).compile();

    sut = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
