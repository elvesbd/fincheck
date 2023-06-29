import { PartialType } from '@nestjs/mapped-types';
import { CreateBankAccountDto } from '../../create/dto/create-bank-account.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {}
