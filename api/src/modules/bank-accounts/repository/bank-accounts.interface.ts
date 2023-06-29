import { CreateBankAccountDto } from '../controllers/create/dto/create-bank-account.dto';

export interface BankAccountsRepository {
  create(id: string, createBankAccountDto: CreateBankAccountDto): Promise<any>;
}
