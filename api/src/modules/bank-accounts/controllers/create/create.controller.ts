import { Controller, Post, Body } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { CreateBankAccountsService } from '../../application/services/create/create.service';
import {
  BankAccountsApiPath,
  BankAccountsApiTag,
} from '../bank-accounts-api.constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BankAccountResponseDto, CreateBankAccountDto } from '../../dtos';

@ApiBearerAuth('JWT-auth')
@ApiTags(BankAccountsApiTag)
@Controller(BankAccountsApiPath)
export class CreateBankAccountsController {
  constructor(
    private readonly createBankAccountsService: CreateBankAccountsService,
  ) {}

  @ApiOperation({ summary: 'Create an bank account' })
  @ApiCreatedResponse({ type: BankAccountResponseDto })
  @ApiBody({ type: CreateBankAccountDto })
  @Post()
  create(
    @ExtractUserId() id: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccountResponseDto> {
    return this.createBankAccountsService.execute(id, createBankAccountDto);
  }
}
