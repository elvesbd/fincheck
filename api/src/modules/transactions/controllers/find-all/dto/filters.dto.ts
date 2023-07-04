import { TransactionType } from 'src/modules/transactions/enum';

export class FiltersDto {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
}
