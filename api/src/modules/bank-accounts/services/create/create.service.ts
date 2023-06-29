import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../../controllers/create/dto/create-bank-account.dto';

@Injectable()
export class CreateBankAccountsService {
  execute(id: string, createBankAccountDto: CreateBankAccountDto) {
    return 'This action adds a new bankAccount';
  }
}
