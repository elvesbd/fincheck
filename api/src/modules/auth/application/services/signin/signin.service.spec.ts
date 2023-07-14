import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';
import { Hasher } from 'src/shared/adapters/cryptography/bcrypt';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt';
import { GetUserByEmailService } from 'src/modules/users/application/services';
import { UserResponseDto } from 'src/modules/users/dto';
import { UserDataBuilder } from 'src/modules/users/__mocks__/data-builder';
import { UnauthorizedException } from '@nestjs/common';
import { SigninDto } from 'src/modules/auth/dto/signin';

describe('SigninService', () => {
  let sut: SigninService;
  let hash: Hasher;
  let encrypt: Encrypt;
  let getUserByEmailService: GetUserByEmailService;

  const user: UserResponseDto = UserDataBuilder.aUser().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const HasherProvider = {
      provide: 'HASHER',
      useValue: {
        compare: jest.fn().mockResolvedValue(true),
      },
    };

    const EncryptProvider = {
      provide: 'ENCRYPT',
      useValue: {
        signAsync: jest.fn().mockResolvedValue('accessToken'),
      },
    };

    const GetUserByEmailServiceProvider = {
      provide: GetUserByEmailService,
      useValue: {
        execute: jest.fn().mockResolvedValue(user),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninService,
        HasherProvider,
        EncryptProvider,
        GetUserByEmailServiceProvider,
      ],
    }).compile();

    sut = module.get<SigninService>(SigninService);
    hash = module.get<Hasher>('HASHER');
    encrypt = module.get<Encrypt>('ENCRYPT');
    getUserByEmailService = module.get<GetUserByEmailService>(
      GetUserByEmailService,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(hash).toBeDefined();
    expect(encrypt).toBeDefined();
    expect(getUserByEmailService).toBeDefined();
  });

  describe('execute()', () => {
    const signinDto: SigninDto = {
      email: 'john@mail.com',
      password: '123456',
    };

    it('should throw an exception if the user searched for by email is not found', async () => {
      jest.spyOn(getUserByEmailService, 'execute').mockResolvedValueOnce(null);
      await expect(sut.execute(signinDto)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials!'),
      );
    });
  });
});
