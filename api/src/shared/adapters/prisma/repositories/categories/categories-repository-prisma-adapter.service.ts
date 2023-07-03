import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repository/categories-repository.interface';
import { PrismaService } from '../../service/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesRepositoryPrismaAdapter implements CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  find(id: string): Promise<Category[]> {
    return this.prismaService.category.findMany({
      where: { userId: id },
    });
  }

  async findOneByIdAndUserId(id: string, userId: string): Promise<Category> {
    return await this.prismaService.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}
