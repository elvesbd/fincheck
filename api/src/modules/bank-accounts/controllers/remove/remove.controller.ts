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

@Controller('bank-accounts')
export class RemoveBankAccountsController {
  constructor(
    private readonly removeBankAccountsService: RemoveBankAccountsService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @ExtractUserId() userId: string,
  ): Promise<void> {
    return this.removeBankAccountsService.execute(id, userId);
  }
}
