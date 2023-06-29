export interface CategoriesRepository {
  find(id: string): Promise<any>;
}
