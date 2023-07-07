import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../create/dto/user-response.dto';
import { UserRepository } from 'src/modules/users/repository';

@Injectable()
export class GetUserByEmailService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserResponseDto> {
    return await this.userRepository.getByEmail(email);
  }
}
