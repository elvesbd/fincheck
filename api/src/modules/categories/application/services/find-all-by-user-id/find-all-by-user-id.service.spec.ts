import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCategoriesByUserIdService } from './find-all-by-user-id.service';
import { CategoriesRepository } from 'src/modules/categories/repository/categories-repository.interface';
import { CategoryResponseDto } from 'src/modules/categories/controllers/find-all-by-user-id/dto/category-response.dto';

describe('FindAllCategoriesByUserIdService', () => {
  let sut: FindAllCategoriesByUserIdService;
  let categoriesRepository: CategoriesRepository;

  const categories: CategoryResponseDto[] = [
    {
      id: 'f791fb59-c696-4aa0-a472-7115a185ad49',
      userId: 'fe721538-8877-4ef0-ba0c-5c9c6cf552d0',
      name: 'Salário',
      icon: 'salary',
      type: 'INCOME',
    },
  ];

  beforeEach(async () => {
    jest.clearAllMocks();

    const CategoriesRepositoryProvider = {
      provide: 'CATEGORIES_REPOSITORY',
      useValue: {
        find: jest.fn().mockResolvedValue(categories),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllCategoriesByUserIdService,
        CategoriesRepositoryProvider,
      ],
    }).compile();

    sut = module.get<FindAllCategoriesByUserIdService>(
      FindAllCategoriesByUserIdService,
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
    const id = 'fe721538-8877-4ef0-ba0c-5c9c6cf552d0';

    it('should be call categoriesRepository.find with correct value', async () => {
      await sut.execute(id);
      expect(categoriesRepository.find).toHaveBeenCalledTimes(1);
      expect(categoriesRepository.find).toHaveBeenCalledWith(id);
    });

    it('should be return an categories list by user id', async () => {
      const result = await sut.execute(id);
      expect(result).toStrictEqual(categories);
      expect(result[0].userId).toBe(id);
    });
  });
});
