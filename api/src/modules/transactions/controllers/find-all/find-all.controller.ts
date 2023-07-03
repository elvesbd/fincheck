import { Controller, Get } from '@nestjs/common';
import { FindAllTransactionsService } from '../../application/services/find-all/find-all.service';
import { API_PATH } from '../transactions-constants.controller';

@Controller(API_PATH)
export class FindAllTransactionsController {
  constructor(
    private readonly findAllTransactionsService: FindAllTransactionsService,
  ) {}

  @Get()
  findAll() {
    return this.findAllTransactionsService.findAll();
  }
}
