import { Category } from "../../categories/interfaces";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE'
}

export interface Transaction extends CreateTransactionParams {
  id: string;
  category?: Pick<Category, 'id' | 'name' | 'icon'>;
}

export interface TransactionFilters {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type']
}
