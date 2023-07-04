import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FindAllTransactionsService } from '../../application/services/find-all/find-all.service';
import { API_PATH } from '../transactions-constants.controller';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FiltersDto } from './dto/filters.dto';

@Controller(API_PATH)
export class FindAllTransactionsController {
  constructor(
    private readonly findAllTransactionsService: FindAllTransactionsService,
  ) {}

  @Get()
  findAll(
    @ExtractUserId() userId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ) {
    const filters: FiltersDto = { month, year };
    return this.findAllTransactionsService.findAll(userId, filters);
  }
}
