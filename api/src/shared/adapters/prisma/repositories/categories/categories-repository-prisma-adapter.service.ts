import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repository/categories-repository.interface';
import { PrismaService } from '../../service/prisma.service';

@Injectable()
export class CategoriesRepositoryPrismaAdapter implements CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  find(id: string): Promise<any> {
    return this.prismaService.category.findMany({
      where: { userId: id },
    });
  }
}
