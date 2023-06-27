import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRepository } from 'src/users/repository/user-repository.interface';
import { PrismaService } from '../../service/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepositoryPrismaAdapter implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }
}
