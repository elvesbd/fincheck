export interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export interface BankAccountResponse {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: string;
  color: string;
}
