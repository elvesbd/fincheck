import { CreateUserDto } from '../application/services/create/dto/create-user.dto';
import { UserResponseDto } from '../application/services/create/dto/user-response.dto';

export interface UserRepository {
  getById(id: string): Promise<UserResponseDto>;
  getByEmail(email: string): Promise<UserResponseDto>;
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
}
