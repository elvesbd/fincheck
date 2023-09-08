import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { UserRepository } from 'src/modules/users/repository';
import { UserDataBuilder } from 'src/modules/users/__mocks__/user-builder';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegistrationException } from 'src/modules/users/exceptions';

describe('CreateUserService', () => {
  let sut: CreateUserService;
  let userRepository: UserRepository;

  const user = UserDataBuilder.aUser().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const UserRepositoryProvider = {
      provide: 'USER_REPOSITORY',
      useValue: {
        create: jest.fn().mockResolvedValue(user),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService, UserRepositoryProvider],
    }).compile();

    sut = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>('USER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute()', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    };

    it('should be called userRepository.create with correct value', async () => {
      await sut.execute(createUserDto);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should be return an exception if unable to complete registration', async () => {
      jest.spyOn(userRepository, 'create').mockResolvedValueOnce(null);

      await expect(sut.execute(createUserDto)).rejects.toThrow(
        new UserRegistrationException(),
      );
    });

    it('should be return an user created on success', async () => {
      const result = await sut.execute(createUserDto);
      expect(result).toStrictEqual(user);
    });
  });
});
