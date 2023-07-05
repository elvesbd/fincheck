import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FindAllTransactionsService } from '../../application/services/find-all/find-all.service';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FiltersDto } from './dto/filters.dto';
import { OptionalParseUUIDPipe } from 'src/shared/pipes';
import { TransactionType } from '../../enum';
import { OptionalParseEnumPipe } from 'src/shared/pipes/optional-parser-enum.pipe';
import { TransactionsApiPath } from '../transactions-api.constants';

@Controller(TransactionsApiPath)
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
    @Query('type', new OptionalParseEnumPipe(TransactionType))
    type: TransactionType,
  ) {
    const filters: FiltersDto = { month, year, bankAccountId, type };
    return this.findAllTransactionsService.findAll(userId, filters);
  }
}
