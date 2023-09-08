import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByEmailService } from './get-by-email.service';
import { UserRepository } from 'src/modules/users/repository';
import { UserDataBuilder } from 'src/modules/users/__mocks__/user-builder';

describe('GetUserByEmailService', () => {
  let sut: GetUserByEmailService;
  let userRepository: UserRepository;

  const user = UserDataBuilder.aUser().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const UserRepositoryProvider = {
      provide: 'USER_REPOSITORY',
      useValue: {
        getByEmail: jest.fn().mockResolvedValue(user),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByEmailService, UserRepositoryProvider],
    }).compile();

    sut = module.get<GetUserByEmailService>(GetUserByEmailService);
    userRepository = module.get<UserRepository>('USER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute()', () => {
    const email = 'john@mail.com';

    it('should be called userRepository.getByEmail with correct value', async () => {
      await sut.execute(email);
      expect(userRepository.getByEmail).toHaveBeenCalledTimes(1);
      expect(userRepository.getByEmail).toHaveBeenCalledWith(email);
    });

    it('should be return an user on success', async () => {
      const result = await sut.execute(email);
      expect(result).toStrictEqual(user);
    });
  });
});
