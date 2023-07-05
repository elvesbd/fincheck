import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RemoveTransactionsService } from '../../application/services/remove/remove.service';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { TransactionsApiPath } from '../transactions-api.constants';

@Controller(TransactionsApiPath)
export class RemoveTransactionsController {
  constructor(
    private readonly removeTransactionsService: RemoveTransactionsService,
  ) {}

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @ExtractUserId() userId: string,
  ) {
    return this.removeTransactionsService.execute(transactionId, userId);
  }
}
