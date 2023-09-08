import { Test, TestingModule } from '@nestjs/testing';
import { JwtAdapter } from './jwt-adapter.service';
import { JwtService } from '@nestjs/jwt';

describe('JwtAdapter', () => {
  let sut: JwtAdapter;
  let jwtService: JwtService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const JwtServiceProvider = {
      provide: JwtService,
      useValue: {
        signAsync: jest.fn().mockResolvedValue('token'),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAdapter, JwtServiceProvider],
    }).compile();

    sut = module.get<JwtAdapter>(JwtAdapter);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signAsync()', () => {});
});
