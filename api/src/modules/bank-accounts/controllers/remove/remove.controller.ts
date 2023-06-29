import { Controller, Delete, Param } from '@nestjs/common';
import { RemoveBankAccountsService } from '../../services/remove/remove.service';

@Controller('bank-accounts')
export class RemoveBankAccountsController {
  constructor(
    private readonly removeBankAccountsService: RemoveBankAccountsService,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeBankAccountsService.execute(id);
  }
}
