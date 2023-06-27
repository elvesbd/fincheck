import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Hash } from 'src/shared/adapters/cryptography/interfaces/hash.interface';
import { CreateUserResponseDto } from 'src/users/dto/create-user-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRepository } from 'src/users/repository/user-repository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    @Inject('HASH')
    private readonly hash: Hash,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const { email, password } = createUserDto;

    const emailExists = await this.userRepository.findUnique(email);
    if (emailExists) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await this.hash.generate(password, 10);
    const data = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = await this.userRepository.create(data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
