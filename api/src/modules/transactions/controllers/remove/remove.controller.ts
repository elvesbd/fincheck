import { Controller, Param, Delete } from '@nestjs/common';
import { RemoveTransactionsService } from '../../application/services/remove/remove.service';
import { API_PATH } from '../transactions-constants.controller';

@Controller(API_PATH)
export class RemoveTransactionsController {
  constructor(
    private readonly removeTransactionsService: RemoveTransactionsService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTransactionsService.remove(+id);
  }
}
