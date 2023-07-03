import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { API_PATH } from '../transactions-constants.controller';
import { CreateTransactionsService } from '../../application/services';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

@Controller(API_PATH)
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
