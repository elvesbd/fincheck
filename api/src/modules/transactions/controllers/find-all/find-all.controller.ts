import {
  Controller,
  Get,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { FindAllTransactionsService } from '../../application/services/find-all/find-all.service';
import { API_PATH } from '../transactions-constants.controller';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FiltersDto } from './dto/filters.dto';
import { OptionalParseUUIDPipe } from 'src/shared/pipes';

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
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId: string,
  ) {
    const filters: FiltersDto = { month, year, bankAccountId };
    return this.findAllTransactionsService.findAll(userId, filters);
  }
}
