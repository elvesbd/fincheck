import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<any> {}
}
