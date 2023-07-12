import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransactionsService } from '../../application/services';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import {
  TransactionsApiPath,
  TransactionsApiTag,
} from '../transactions-api.constants';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionResponseDto } from '../../dto';

@ApiTags(TransactionsApiTag)
@Controller(TransactionsApiPath)
export class CreateTransactionsController {
  constructor(
    private readonly createTransactionsService: CreateTransactionsService,
  ) {}

  @ApiOperation({ summary: 'Create an transaction' })
  @ApiCreatedResponse({ type: TransactionResponseDto })
  @ApiBody({ type: CreateTransactionDto })
  @Post()
  create(
    @ExtractUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return this.createTransactionsService.create(userId, createTransactionDto);
  }
}
