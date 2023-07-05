import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository';
import { UserResponseDto } from '../create/dto/user-response.dto';

@Injectable()
export class GetUserByEmailService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserResponseDto> {
    return await this.userRepository.getById(email);
  }
}
