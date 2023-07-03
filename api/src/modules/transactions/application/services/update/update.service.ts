import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from 'src/modules/transactions/controllers/update/dto/update-transaction.dto';

@Injectable()
export class UpdateTransactionsService {
  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }
}
