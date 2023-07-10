import { CreateBankAccountDto } from '../controllers/create/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../controllers/update/dto/update-bank-account.dto';
import { BankAccountResponseDto } from '../dto/bank-account-response.dto';

export interface BankAccountsRepository {
  create(
    id: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountResponseDto>;
  findTransactionsByUserIdAndAccountId(
    id: string,
  ): Promise<BankAccountResponseDto[]>;
  findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<BankAccountResponseDto>;
  update(
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccountResponseDto>;
  remove(id: string): Promise<void>;
}
