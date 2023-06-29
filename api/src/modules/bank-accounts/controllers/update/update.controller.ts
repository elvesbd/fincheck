import { Controller, Body, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { UpdateBankAccountsService } from '../../services/update/update.service';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

@Controller('bank-accounts')
export class UpdateBankAccountsController {
  constructor(
    private readonly updateBankAccountsService: UpdateBankAccountsService,
  ) {}

  @Put(':id')
  Update(
    @Param('id', ParseUUIDPipe) id: string,
    @ExtractUserId() userId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.updateBankAccountsService.execute(
      id,
      userId,
      updateBankAccountDto,
    );
  }
}
