import { CategoryResponseDto } from '../../controllers/find-all-by-user-id/dto/category-response.dto';

export class CategoryDataBuilder {
  private categoryResponseDto: CategoryResponseDto = {
    id: 'f791fb59-c696-4aa0-a472-7115a185ad49',
    userId: 'fe721538-8877-4ef0-ba0c-5c9c6cf552d0',
    name: 'Salário',
    icon: 'salary',
    type: 'INCOME',
  };

  static aCategory(): CategoryDataBuilder {
    return new CategoryDataBuilder();
  }

  build(): CategoryResponseDto {
    return this.categoryResponseDto;
  }
}
