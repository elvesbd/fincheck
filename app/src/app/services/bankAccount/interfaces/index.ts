import { AccountType } from "../enum";

export interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
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
