import { Module } from '@nestjs/common';
import {
  FindAllTransactionsController,
  UpdateTransactionsController,
  RemoveTransactionsController,
  CreateTransactionsController,
} from './controllers';
import {
  CreateTransactionsService,
  FindAllTransactionsService,
  UpdateTransactionsService,
  RemoveTransactionsService,
} from './application/services';

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
  providers: [...providers],
})
export class TransactionsModule {}
