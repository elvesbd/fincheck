import { Controller, Body, Put, Param } from '@nestjs/common';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { UpdateBankAccountsService } from '../../services/update/update.service';

@Controller('bank-accounts')
export class UpdateBankAccountsController {
  constructor(
    private readonly updateBankAccountsService: UpdateBankAccountsService,
  ) {}

  @Put(':id')
  Update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.updateBankAccountsService.execute(id, updateBankAccountDto);
  }
}
