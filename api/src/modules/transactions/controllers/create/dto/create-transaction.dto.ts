import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from 'src/modules/transactions/enum/transaction-type.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ enum: TransactionType })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;
}
