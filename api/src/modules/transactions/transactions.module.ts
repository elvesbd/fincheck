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
import { TransactionsRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/transactions/transactions-repository-prisma-adapter.service';
import { ValidateBankAccountOwnerShipService } from '../bank-accounts/domain/validate-bank-account-owner-ship.service';
import { ValidateCategoryOwnerShipService } from '../categories/domain/validate-category-owner-ship.service';
import { CategoriesModule } from '../categories/categories.module';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { ValidateEntitiesOwnerShipService } from './domain/validate-entites-ownership.service';
import { ValidateTransactionsOwnershipService } from './domain/validate-transactions-ownership.service';

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
