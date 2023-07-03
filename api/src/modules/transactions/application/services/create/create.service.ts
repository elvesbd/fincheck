import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/controllers/create/dto/create-transaction.dto';

@Injectable()
export class CreateTransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }
}
