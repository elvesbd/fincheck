import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../../dto';

@Injectable()
export class UserDataBuilder {
  private userResponseDto: UserResponseDto = {
    id: 'b013f8f4-804e-4816-b799-46044d86816c',
    name: 'John Doe',
    email: 'john@mail.com',
    password: '123456',
  };

  static aUser(): UserDataBuilder {
    return new UserDataBuilder();
  }

  build(): UserResponseDto {
    return this.userResponseDto;
  }
}
