import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { RemoveBankAccountsService } from '../../application/services/remove/remove.service';
import {
  BankAccountsApiPath,
  BankAccountsApiTag,
} from '../bank-accounts-api.constants';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags(BankAccountsApiTag)
@Controller(BankAccountsApiPath)
export class RemoveBankAccountsController {
  constructor(
    private readonly removeBankAccountsService: RemoveBankAccountsService,
  ) {}

  @ApiOperation({ summary: 'Remove a bank account' })
  @ApiNoContentResponse({
    description: 'The bank account has been successfully removed',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @ExtractUserId() userId: string,
  ): Promise<void> {
    return this.removeBankAccountsService.execute(id, userId);
  }
}
