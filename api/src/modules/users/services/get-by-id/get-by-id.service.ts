import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user-repository.interface';
import { GetByIdResponseDto } from '../../controllers/get-by-id/dto/get-by-id-response.dto';

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<GetByIdResponseDto> {
    const user = await this.userRepository.findById(id);

    return {
      name: user.name,
      email: user.email,
    };
  }
}
