import { Controller, Get } from '@nestjs/common';
import { FindAllBankAccountsService } from '../../services/find-all/find-all.service';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

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
