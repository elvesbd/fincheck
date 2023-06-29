import { Controller, Post, Body } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { CreateBankAccountsService } from '../../services/create/create.service';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

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
