import { CreateTransactionDto } from '../controllers';
import { TransactionResponseDto } from './dto/transaction-response.dto';

export interface TransactionsRepository {
  findAll(userId: string): Promise<TransactionResponseDto[]>;
  create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto>;
}
