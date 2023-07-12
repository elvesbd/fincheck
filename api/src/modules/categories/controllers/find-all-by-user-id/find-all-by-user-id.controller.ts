import { Controller, Get } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllCategoriesByUserIdService } from '../../application/services/find-all-by-user-id/find-all-by-user-id.service';
import {
  CategoriesApiPath,
  CategoriesApiTag,
} from '../categories-api.constants';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags(CategoriesApiTag)
@Controller(CategoriesApiPath)
export class FindAllCategoriesByUserIdController {
  constructor(
    private readonly findAllCategoriesByUserIdService: FindAllCategoriesByUserIdService,
  ) {}

  @ApiOperation({ summary: 'find all categories' })
  @ApiOkResponse({ type: [CategoryResponseDto] })
  @Get()
  find(@ExtractUserId() id: string): Promise<CategoryResponseDto[]> {
    return this.findAllCategoriesByUserIdService.execute(id);
  }
}
