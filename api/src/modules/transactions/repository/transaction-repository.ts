import { CreateTransactionDto, UpdateTransactionDto } from '../controllers';
import { TransactionResponseDto } from './dto/transaction-response.dto';

export interface TransactionsRepository {
  findAll(userId: string): Promise<TransactionResponseDto[]>;
  findFirst(
    transactionId: string,
    userId: string,
  ): Promise<TransactionResponseDto>;
  create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto>;
  update(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponseDto>;
  remove(transactionId: string): Promise<void>;
}
