import { BankAccountType } from '../../enums/type.enum';

export class BankAccountResponseDto {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
}
