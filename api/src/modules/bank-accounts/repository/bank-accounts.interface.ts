import {
  CreateBankAccountDto,
  BankAccountResponseDto,
  UpdateBankAccountDto,
} from '../dtos';
import { BankAccountDto } from './dto/bank-account.dto';

export interface BankAccountsRepository {
  create(
    id: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountResponseDto>;
  findTransactionsByUserId(id: string): Promise<BankAccountDto[]>;
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
