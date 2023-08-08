import { AccountType } from "../enum";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export interface UpdateBankAccountParams extends CreateBankAccountParams {
  id: string;
}

export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: AccountType;
  color: string;
}

export interface BankAccounts extends BankAccount {
  currentBalance: number;
}
