import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/modules/transactions/enum';

export class CategoryResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty({ enum: TransactionType })
  type: string;
}
