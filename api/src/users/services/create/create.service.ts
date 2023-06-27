import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CreateUserService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
