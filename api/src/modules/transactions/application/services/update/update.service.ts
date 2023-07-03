import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from 'src/modules/transactions/controllers';

@Injectable()
export class UpdateTransactionsService {
  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }
}
