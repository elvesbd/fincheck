import { CategoryResponseDto } from '../controllers/find-all-by-user-id/dto/category-response.dto';

export interface CategoriesRepository {
  find(id: string): Promise<CategoryResponseDto[]>;
  findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<CategoryResponseDto>;
}
