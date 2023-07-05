import { Inject, Injectable } from '@nestjs/common';
import { GetUserResponseDto } from '../../controllers/get-by-id/dto';
import { UserRepository } from '../../repository';

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<GetUserResponseDto> {
    const { name, email } = await this.userRepository.getById(id);

    return {
      name,
      email,
    };
  }
}
