import { Controller, Body, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { UpdateTransactionsService } from '../../application/services/update/update.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { TransactionResponseDto } from '../../repository/dto/transaction-response.dto';
import {
  TransactionsApiPath,
  TransactionsApiTag,
} from '../transactions-api.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(TransactionsApiTag)
@Controller(TransactionsApiPath)
export class UpdateTransactionsController {
  constructor(
    private readonly updateTransactionsService: UpdateTransactionsService,
  ) {}

  @Put(':transactionId')
  update(
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @ExtractUserId() userId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return this.updateTransactionsService.update(
      transactionId,
      userId,
      updateTransactionDto,
    );
  }
}
