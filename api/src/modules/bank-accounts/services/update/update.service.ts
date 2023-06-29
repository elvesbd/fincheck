import { Injectable } from '@nestjs/common';
import { UpdateBankAccountDto } from '../../controllers/update/dto/update-bank-account.dto';

@Injectable()
export class UpdateBankAccountsService {
  execute(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }
}
