import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import {
  CreateUserService,
  GetUserByEmailService,
} from 'src/modules/users/application/services';
import { Hasher } from 'src/shared/adapters/cryptography/bcrypt';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt';
import { UserResponseDto } from 'src/modules/users/dto';
import { UserDataBuilder } from 'src/modules/users/__mocks__/data-builder';

const user: UserResponseDto = UserDataBuilder.aUser().build();
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZTcyMTUzOC04ODc3LTRlZjAtYmEwYy01YzljNmNmNTUyZDAiLCJpYXQiOjE2ODkxNjQ1OTksImV4cCI6MTY4OTc2OTM5OX0.iIXevPgmBSz4zZUFY0t-rxRlCUcisSnT8qlelDqHiw0';

describe('SignupService', () => {
  let sut: SignupService;
  let hasher: Hasher;
  let encrypt: Encrypt;
  let createUserService: CreateUserService;
  let getUserByEmailService: GetUserByEmailService;

  const HasherProvider = {
    provide: 'HASHER',
    useValue: {
      hash: jest.fn().mockResolvedValue('any_hash'),
    },
  };

  const EncryptProvider = {
    provide: 'ENCRYPT',
    useValue: {
      signAsync: jest.fn().mockResolvedValue(accessToken),
    },
  };

  const CreateUserServiceProvider = {
    provide: CreateUserService,
    useValue: {
      execute: jest.fn().mockResolvedValue(user),
    },
  };

  const GetUserByEmailServiceProvide = {
    provide: GetUserByEmailService,
    useValue: {
      execute: jest.fn().mockResolvedValue(user),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HasherProvider,
        EncryptProvider,
        CreateUserServiceProvider,
        GetUserByEmailServiceProvide,
        SignupService,
      ],
    }).compile();

    sut = module.get<SignupService>(SignupService);
    hasher = module.get<Hasher>('HASHER');
    encrypt = module.get<Encrypt>('ENCRYPT');
    createUserService = module.get<CreateUserService>(CreateUserService);
    getUserByEmailService = module.get<GetUserByEmailService>(
      GetUserByEmailService,
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(hasher).toBeDefined();
    expect(encrypt).toBeDefined();
    expect(createUserService).toBeDefined();
    expect(getUserByEmailService).toBeDefined();
  });
});
