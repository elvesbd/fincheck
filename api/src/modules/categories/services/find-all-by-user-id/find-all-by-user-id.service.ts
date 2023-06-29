import { Inject, Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../repository/categories-repository.interface';

@Injectable()
export class FindAllCategoriesByUserIdService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(id: string) {
    return await this.categoriesRepository.find(id);
  }
}
