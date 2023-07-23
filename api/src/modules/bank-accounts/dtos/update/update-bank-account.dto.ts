import { ApiProperty } from '@nestjs/swagger';
import { BankAccountType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';

export class UpdateBankAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
