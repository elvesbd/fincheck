import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<Partial<User>>;
}
