import { Module } from '@nestjs/common';
import { FindAllCategoriesByUserIdController } from './controllers/find-all-by-user-id/find-all-by-user-id.controller';
import { CategoriesRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/categories/categories-repository-prisma-adapter.service';
import { FindAllCategoriesByUserIdService } from './application/services/find-all-by-user-id/find-all-by-user-id.service';
import { ValidateCategoryOwnerShipService } from './domain/validate-category-owner-ship.service';

@Module({
  controllers: [FindAllCategoriesByUserIdController],
  providers: [
    {
      provide: 'CATEGORIES_REPOSITORY',
      useClass: CategoriesRepositoryPrismaAdapter,
    },
    FindAllCategoriesByUserIdService,
    ValidateCategoryOwnerShipService,
  ],
  exports: [ValidateCategoryOwnerShipService, 'CATEGORIES_REPOSITORY'],
})
export class CategoriesModule {}
