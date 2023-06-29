import { Controller, Get } from '@nestjs/common';
import { FindAllBankAccountsService } from '../../services/find-all/find-all.service';

@Controller('bank-accounts')
export class FinAllBankAccountsController {
  constructor(
    private readonly finAllBankAccountsService: FindAllBankAccountsService,
  ) {}

  @Get()
  create() {
    return this.finAllBankAccountsService.execute();
  }
}
