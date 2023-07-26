import { ApiProperty } from '@nestjs/swagger';

class PartialTransaction {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  value: number;
}

export class BankAccountWithBalanceResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  initialBalance: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  color: string;

  @ApiProperty({
    type: [PartialTransaction],
  })
  transactions?: PartialTransaction[];

  @ApiProperty()
  currentBalance: number;
}
