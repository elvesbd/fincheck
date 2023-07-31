import { Module } from '@nestjs/common';
import {
  CreateTransactionsService,
  FindAllTransactionsService,
  UpdateTransactionsService,
  RemoveTransactionsService,
} from './application/services';
import {
  CreateTransactionsController,
  FindAllTransactionsController,
  UpdateTransactionsController,
  RemoveTransactionsController,
} from './controllers';
import {
  ValidateTransactionsOwnershipService,
  ValidateEntitiesOwnerShipService,
} from './application/domain';
import { CategoriesModule } from '../categories/categories.module';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { TransactionsRepositoryPrismaAdapter } from 'src/shared/adapters/prisma';
import { ValidateBankAccountOwnerShipService } from '../bank-accounts/application/domain';
import { ValidateCategoryOwnerShipService } from '../categories/application/domain';

const controllers = [
  CreateTransactionsController,
  FindAllTransactionsController,
  UpdateTransactionsController,
  RemoveTransactionsController,
];
const providers = [
  CreateTransactionsService,
  FindAllTransactionsService,
  UpdateTransactionsService,
  RemoveTransactionsService,
  ValidateTransactionsOwnershipService,
  ValidateEntitiesOwnerShipService,
  ValidateBankAccountOwnerShipService,
  ValidateCategoryOwnerShipService,
];

@Module({
  imports: [CategoriesModule, BankAccountsModule],
  controllers: [...controllers],
  providers: [
    {
      provide: 'TRANSACTIONS_REPOSITORY',
      useClass: TransactionsRepositoryPrismaAdapter,
    },
    ...providers,
  ],
})
export class TransactionsModule {}
