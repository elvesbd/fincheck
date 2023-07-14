import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from 'src/modules/users/repository';
import { UserRegistrationException } from 'src/modules/users/exceptions';
import { UserResponseDto } from 'src/modules/users/dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create(createUserDto);
    if (!user) throw new UserRegistrationException();
    return user;
  }
}
