import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/controllers';

@Injectable()
export class CreateTransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }
}
