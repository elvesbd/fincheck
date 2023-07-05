import { UserResponseDto } from '../services/create/dto/user-response.dto';
import { CreateUserDto } from '../services/create/dto/create-user.dto';

export interface UserRepository {
  getById(id: string): Promise<UserResponseDto>;
  getByEmail(email: string): Promise<UserResponseDto>;
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
}
