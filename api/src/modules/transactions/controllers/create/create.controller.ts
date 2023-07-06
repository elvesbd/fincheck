import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransactionsService } from '../../application/services';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import {
  TransactionsApiPath,
  TransactionsApiTag,
} from '../transactions-api.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(TransactionsApiTag)
@Controller(TransactionsApiPath)
export class CreateTransactionsController {
  constructor(
    private readonly createTransactionsService: CreateTransactionsService,
  ) {}

  @Post()
  create(
    @ExtractUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.createTransactionsService.create(userId, createTransactionDto);
  }
}
