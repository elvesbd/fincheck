import { Controller, Get } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllCategoriesByUserIdService } from '../../application/services/find-all-by-user-id/find-all-by-user-id.service';
import { CategoriesApiPath } from '../categories-api.constants';

@Controller(CategoriesApiPath)
export class FindAllCategoriesByUserIdController {
  constructor(
    private readonly findAllCategoriesByUserIdService: FindAllCategoriesByUserIdService,
  ) {}

  @Get()
  find(@ExtractUserId() id: string) {
    return this.findAllCategoriesByUserIdService.execute(id);
  }
}
