export interface CategoriesRepository {
  find(id: string): Promise<any[]>;
  findOneByIdAndUserId(id: string, userId: string): Promise<any>;
}
