import { User } from '@prisma/client';
import { SignupDto } from 'src/modules/auth/dto/signup.dto';

export interface UserRepository {
  create(signupDto: SignupDto): Promise<User>;
  findByEmail(email: string): Promise<Partial<User>>;
}
