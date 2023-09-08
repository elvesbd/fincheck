import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum';

class Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;
}

export class TransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  bankAccountId: string;

  @ApiProperty()
  categoryId?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ enum: TransactionType })
  type: string;

  @ApiProperty({ type: Category })
  category?: Category;
}
