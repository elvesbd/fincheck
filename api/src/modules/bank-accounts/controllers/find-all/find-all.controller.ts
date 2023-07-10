import { Controller, Get } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { FindAllBankAccountsService } from '../../application/services/find-all/find-all.service';
import {
  BankAccountsApiPath,
  BankAccountsApiTag,
} from '../bank-accounts-api.constants';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BankAccountWithBalanceResponseDto } from './dto/bank-account-with-balance-response.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags(BankAccountsApiTag)
@Controller(BankAccountsApiPath)
export class FinAllBankAccountsController {
  constructor(
    private readonly finAllBankAccountsService: FindAllBankAccountsService,
  ) {}

  @ApiOperation({ summary: 'Find all bank accounts' })
  @ApiOkResponse({ type: BankAccountWithBalanceResponseDto })
  @Get()
  findAll(
    @ExtractUserId() id: string,
  ): Promise<BankAccountWithBalanceResponseDto[]> {
    return this.finAllBankAccountsService.execute(id);
  }
}
