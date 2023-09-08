import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { UserRepository } from 'src/modules/users/repository';
import { UserDataBuilder } from 'src/modules/users/__mocks__/user-builder';

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
});
