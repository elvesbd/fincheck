import {
  CreateBankAccountDto,
  BankAccountResponseDto,
  UpdateBankAccountDto,
} from '../dtos';

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
