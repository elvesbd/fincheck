import { Controller, Get } from '@nestjs/common';
import { API_PATH } from '../constants.controller';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllCategoriesByUserIdService } from '../../services/find-all-by-user-id/find-all-by-user-id.service';

@Controller(API_PATH)
export class FindAllCategoriesByUserIdController {
  constructor(
    private readonly findAllCategoriesByUserIdService: FindAllCategoriesByUserIdService,
  ) {}

  @Get()
  find(@ExtractUserId() id: string) {
    return this.findAllCategoriesByUserIdService.execute(id);
  }
}
