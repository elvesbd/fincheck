export interface TransactionsRepository {
  findAll(userId: string): Promise<any>;
}
