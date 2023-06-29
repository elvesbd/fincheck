import { BankAccountType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';

export class UpdateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
