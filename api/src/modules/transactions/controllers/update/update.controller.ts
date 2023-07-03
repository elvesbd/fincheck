import { Controller, Body, Param, Put } from '@nestjs/common';
import { UpdateTransactionsService } from '../../application/services/update/update.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { API_PATH } from '../transactions-constants.controller';

@Controller(API_PATH)
export class UpdateTransactionsController {
  constructor(
    private readonly updateTransactionsService: UpdateTransactionsService,
  ) {}

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.updateTransactionsService.update(id, updateTransactionDto);
  }
}
