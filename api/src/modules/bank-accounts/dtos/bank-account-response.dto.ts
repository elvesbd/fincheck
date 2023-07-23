import { ApiProperty } from '@nestjs/swagger';

export class BankAccountResponseDto {
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
}
