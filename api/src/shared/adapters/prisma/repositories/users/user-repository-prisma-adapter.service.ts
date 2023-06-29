import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from 'src/modules/users/repository/user-repository.interface';
import { SignupDto } from 'src/modules/auth/dto/signup/signup.dto';

@Injectable()
export class UserRepositoryPrismaAdapter implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Partial<User>> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Partial<User>> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async create(signupDto: SignupDto): Promise<User> {
    const { name, email, password } = signupDto;
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });
  }
}
