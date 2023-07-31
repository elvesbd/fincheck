import { Test, TestingModule } from '@nestjs/testing';
import { ValidateCategoryOwnerShipService } from './validate-category-owner-ship.service';
import { CategoriesRepository } from '../repository/categories-repository.interface';
import { CategoryResponseDto } from '../controllers/find-all-by-user-id/dto/category-response.dto';
import { NotFoundException } from '@nestjs/common';

describe('ValidateCategoryOwnerShipService', () => {
  let sut: ValidateCategoryOwnerShipService;
  let categoriesRepository: CategoriesRepository;

  const category: CategoryResponseDto = {
    id: 'f791fb59-c696-4aa0-a472-7115a185ad49',
    userId: 'fe721538-8877-4ef0-ba0c-5c9c6cf552d0',
    name: 'Salário',
    icon: 'salary',
    type: 'INCOME',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const CategoriesRepositoryProvide = {
      provide: 'CATEGORIES_REPOSITORY',
      useValue: {
        findOneByIdAndUserId: jest.fn().mockResolvedValue(category),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateCategoryOwnerShipService,
        CategoriesRepositoryProvide,
      ],
    }).compile();

    sut = module.get<ValidateCategoryOwnerShipService>(
      ValidateCategoryOwnerShipService,
    );
    categoriesRepository = module.get<CategoriesRepository>(
      'CATEGORIES_REPOSITORY',
    );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(categoriesRepository).toBeDefined();
  });

  describe('execute()', () => {
    const id = 'b013f8f4-804e-4816-b799-46044d86832a';
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';

    it('should be call categoriesRepository.findOneByIdAndUserId with correct values', async () => {
      await sut.execute(id, userId);
      expect(categoriesRepository.findOneByIdAndUserId).toHaveBeenCalledTimes(
        1,
      );
      expect(categoriesRepository.findOneByIdAndUserId).toHaveBeenCalledWith(
        id,
        userId,
      );
    });

    it('should be return an exception if category not found', async () => {
      jest
        .spyOn(categoriesRepository, 'findOneByIdAndUserId')
        .mockResolvedValueOnce(undefined);

      await expect(sut.execute(id, userId)).rejects.toThrow(
        new NotFoundException('Category not found'),
      );
    });
  });
});
