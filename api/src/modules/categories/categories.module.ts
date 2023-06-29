import { Module } from '@nestjs/common';
import { FindAllCategoriesByUserIdService } from './services/find-all-by-user-id/find-all-by-user-id.service';
import { FindAllCategoriesByUserIdController } from './controllers/find-all-by-user-id/find-all-by-user-id.controller';
import { CategoriesRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/categories/categories-repository-prisma-adapter.service';

@Module({
  controllers: [FindAllCategoriesByUserIdController],
  providers: [
    {
      provide: 'CATEGORIES_REPOSITORY',
      useClass: CategoriesRepositoryPrismaAdapter,
    },
    FindAllCategoriesByUserIdService,
  ],
})
export class CategoriesModule {}
