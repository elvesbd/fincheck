import { CreateUserDto } from '../dto/create-user.dto';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<any>;
}
