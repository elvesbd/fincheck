import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ValidateCategoryOwnerShipService } from './validate-category-owner-ship.service';
import { CategoryDataBuilder } from '../../__mocks__/category-builder';
import { CategoryResponseDto } from '../../controllers/find-all-by-user-id/dto/category-response.dto';
import { CategoriesRepository } from '../../repository/categories-repository.interface';

describe('ValidateCategoryOwnerShipService', () => {
  let sut: ValidateCategoryOwnerShipService;
  let categoriesRepository: CategoriesRepository;

  const category: CategoryResponseDto = CategoryDataBuilder.aCategory().build();

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
