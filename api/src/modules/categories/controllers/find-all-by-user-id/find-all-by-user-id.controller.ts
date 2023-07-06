import { Controller, Get } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllCategoriesByUserIdService } from '../../application/services/find-all-by-user-id/find-all-by-user-id.service';
import {
  CategoriesApiPath,
  CategoriesApiTag,
} from '../categories-api.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(CategoriesApiTag)
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
