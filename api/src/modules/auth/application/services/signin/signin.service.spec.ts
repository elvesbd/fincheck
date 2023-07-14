import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';
import { Hasher } from 'src/shared/adapters/cryptography/bcrypt';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt';
import { GetUserByEmailService } from 'src/modules/users/application/services';
import { UserResponseDto } from 'src/modules/users/dto';

describe('SigninService', () => {
  let sut: SigninService;
  let hash: Hasher;
  let encrypt: Encrypt;
  let getUserByEmailService: GetUserByEmailService;

  const user: UserResponseDto = {
    id: 'b013f8f4-804e-4816-b799-46044d86816c',
    name: 'John Doe',
    email: 'john@mail.com',
    password: '123456',
  };

  beforeEach(async () => {
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
});
