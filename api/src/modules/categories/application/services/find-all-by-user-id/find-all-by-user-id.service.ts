import { Inject, Injectable } from '@nestjs/common';
import { CategoryResponseDto } from 'src/modules/categories/controllers/find-all-by-user-id/dto/category-response.dto';
import { CategoriesRepository } from 'src/modules/categories/repository/categories-repository.interface';

@Injectable()
export class FindAllCategoriesByUserIdService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(id: string): Promise<CategoryResponseDto[]> {
    return await this.categoriesRepository.find(id);
  }
}
