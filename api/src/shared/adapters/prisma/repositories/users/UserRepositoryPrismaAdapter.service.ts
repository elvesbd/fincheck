import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRepository } from 'src/users/repository/user-repository.interface';
import { PrismaService } from '../../service/prisma.service';

@Injectable()
export class UserRepositoryPrismaAdapter implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
