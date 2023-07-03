import { Controller, Get } from '@nestjs/common';
import { FindAllTransactionsService } from '../../application/services/find-all/find-all.service';
import { API_PATH } from '../transactions-constants.controller';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

@Controller(API_PATH)
export class FindAllTransactionsController {
  constructor(
    private readonly findAllTransactionsService: FindAllTransactionsService,
  ) {}

  @Get()
  findAll(@ExtractUserId() userId: string) {
    return this.findAllTransactionsService.findAll(userId);
  }
}
