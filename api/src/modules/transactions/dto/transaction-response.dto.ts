import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum';

export class TransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ enum: TransactionType })
  type: string;
}
