import { TransactionResponseDto } from 'src/modules/transactions/repository/dto/transaction-response.dto';

export class BankAccountDto {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
  transactions?: TransactionResponseDto[];
}
