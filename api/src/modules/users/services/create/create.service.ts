import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Hasher } from 'src/shared/adapters/cryptography/interfaces/hasher.interface';
import { CreateUserResponseDto } from '../../dto/create-user-response.dto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserRepository } from '../../repository/user-repository.interface';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    @Inject('HASHER')
    private readonly hasher: Hasher,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    try {
      const { email, password } = createUserDto;

      const user = await this.userRepository.findByEmail(email);
      if (user.email) {
        throw new ConflictException('This email is already in use');
      }

      const hashedPassword = await this.hasher.hash(password, 10);
      const data = {
        ...createUserDto,
        password: hashedPassword,
      };

      const newUser = await this.userRepository.create(data);

      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
