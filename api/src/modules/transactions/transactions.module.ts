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
];

@Module({
  controllers: [...controllers],
  providers: [
    {
      provide: 'TRANSACTION_REPOSITORY',
      useClass: TransactionsRepositoryPrismaAdapter,
    },
    ...providers,
  ],
})
export class TransactionsModule {}
