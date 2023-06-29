import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCategoriesByUserIdController } from './find-all-by-user-id.controller';
import { FindAllCategoriesByUserIdService } from '../../services/find-all-by-user-id/find-all-by-user-id.service';

describe('FindAllCategoriesByUserIdController', () => {
  let controller: FindAllCategoriesByUserIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllCategoriesByUserIdController],
      providers: [FindAllCategoriesByUserIdService],
    }).compile();

    controller = module.get<FindAllCategoriesByUserIdController>(
      FindAllCategoriesByUserIdController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
