import { Controller, Body, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { UpdateTransactionsService } from '../../application/services/update/update.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import {
  TransactionsApiPath,
  TransactionsApiTag,
} from '../transactions-api.constants';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionResponseDto } from '../../dto';

@ApiBearerAuth('JWT-auth')
@ApiTags(TransactionsApiTag)
@Controller(TransactionsApiPath)
export class UpdateTransactionsController {
  constructor(
    private readonly updateTransactionsService: UpdateTransactionsService,
  ) {}

  @ApiOperation({ summary: 'update an transaction' })
  @ApiOkResponse({
    type: TransactionResponseDto,
  })
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
