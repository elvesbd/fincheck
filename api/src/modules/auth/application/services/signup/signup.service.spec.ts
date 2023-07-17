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
import { SignupDto } from 'src/modules/auth/dto/signup';
import { ConflictException } from '@nestjs/common';

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
      execute: jest.fn().mockResolvedValue(null),
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

  describe('execute()', () => {
    const signupDto: SignupDto = {
      name: 'John Doe',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    it('should be ensures that getUserByEmailService.execute is called with the correct parameters', async () => {
      await sut.execute(signupDto);
      expect(getUserByEmailService.execute).toHaveBeenCalledTimes(1);
      expect(getUserByEmailService.execute).toHaveBeenCalledWith(
        signupDto.email,
      );
    });

    it('should be return an exception if email is already in use', async () => {
      jest.spyOn(getUserByEmailService, 'execute').mockResolvedValueOnce(user);
      await expect(sut.execute(signupDto)).rejects.toThrow(
        new ConflictException('This email is already in use'),
      );
    });

    it('should be ensures that generatePasswordHash is called with the correct parameters', async () => {
      await sut.execute(signupDto);
      expect(hasher.hash).toHaveBeenCalledTimes(2);
      expect(hasher.hash).toHaveBeenCalledWith(signupDto.password, 10);
    });

    it('should be ensures that generateToken is called with the correct parameters', async () => {
      await sut.execute(signupDto);
      expect(encrypt.signAsync).toHaveBeenCalledTimes(3);
      expect(encrypt.signAsync).toHaveBeenCalledWith({ sub: user.id });
    });

    it('should be return an access token on success', async () => {
      const result = await sut.execute(signupDto);
      expect(result).toBeDefined();
      expect(result).toStrictEqual({ accessToken });
    });
  });
});
