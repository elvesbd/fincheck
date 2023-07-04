import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RemoveTransactionsService } from '../../application/services/remove/remove.service';
import { API_PATH } from '../transactions-constants.controller';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

@Controller(API_PATH)
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
