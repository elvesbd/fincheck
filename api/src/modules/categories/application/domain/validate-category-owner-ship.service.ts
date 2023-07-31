import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../repository/categories-repository.interface';

@Injectable()
export class ValidateCategoryOwnerShipService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const isOwner = await this.categoriesRepository.findOneByIdAndUserId(
      id,
      userId,
    );

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
