import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdService } from './get-by-id.service';
import { UserRepository } from 'src/modules/users/repository';
import { UserDataBuilder } from 'src/modules/users/__mocks__/user-builder';

describe('GetUserByIdService', () => {
  let sut: GetUserByIdService;
  let userRepository: UserRepository;

  const user = UserDataBuilder.aUser().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const UserRepositoryProvider = {
      provide: 'USER_REPOSITORY',
      useValue: {
        getById: jest.fn().mockResolvedValue(user),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByIdService, UserRepositoryProvider],
    }).compile();

    sut = module.get<GetUserByIdService>(GetUserByIdService);
    userRepository = module.get<UserRepository>('USER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86816c';
    const { name, email } = user;

    it('should be called userRepository.getByEmail with correct value', async () => {
      await sut.execute(id);
      expect(userRepository.getById).toHaveBeenCalledTimes(1);
      expect(userRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should be return an user on success', async () => {
      const result = await sut.execute(id);
      expect(result).toStrictEqual({ name, email });
    });
  });
});
