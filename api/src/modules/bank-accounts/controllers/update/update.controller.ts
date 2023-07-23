import { Controller, Body, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { UpdateBankAccountsService } from '../../application/services/update/update.service';
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
import { BankAccountResponseDto } from '../../dtos/bank-account-response.dto';
import { UpdateBankAccountDto } from '../../dtos';

@ApiBearerAuth('JWT-auth')
@ApiTags(BankAccountsApiTag)
@Controller(BankAccountsApiPath)
export class UpdateBankAccountsController {
  constructor(
    private readonly updateBankAccountsService: UpdateBankAccountsService,
  ) {}

  @ApiOperation({ summary: 'Update a bank account' })
  @ApiOkResponse({ type: BankAccountResponseDto })
  @Put(':id')
  Update(
    @Param('id', ParseUUIDPipe) id: string,
    @ExtractUserId() userId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccountResponseDto> {
    return this.updateBankAccountsService.execute(
      id,
      userId,
      updateBankAccountDto,
    );
  }
}
