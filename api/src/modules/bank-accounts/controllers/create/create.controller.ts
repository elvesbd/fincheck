import { Controller, Post, Body } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { CreateBankAccountsService } from '../../application/services/create/create.service';

@Controller('bank-accounts')
export class CreateBankAccountsController {
  constructor(
    private readonly createBankAccountsService: CreateBankAccountsService,
  ) {}

  @Post()
  create(
    @ExtractUserId() id: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.createBankAccountsService.execute(id, createBankAccountDto);
  }
}
