export class TransactionResponseDto {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: Date;
  type: string;
}
