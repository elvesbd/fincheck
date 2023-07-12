import { Module } from '@nestjs/common';
import { ValidateCategoryOwnerShipService } from './domain';
import { CategoriesRepositoryPrismaAdapter } from 'src/shared/adapters/prisma';
import { FindAllCategoriesByUserIdController } from './controllers';
import { FindAllCategoriesByUserIdService } from './application/services';

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
