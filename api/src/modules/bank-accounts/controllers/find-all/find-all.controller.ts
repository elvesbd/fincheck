import { Controller, Get } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllBankAccountsService } from '../../application/services/find-all/find-all.service';

@Controller('bank-accounts')
export class FinAllBankAccountsController {
  constructor(
    private readonly finAllBankAccountsService: FindAllBankAccountsService,
  ) {}

  @Get()
  findAll(@ExtractUserId() id: string) {
    return this.finAllBankAccountsService.execute(id);
  }
}
