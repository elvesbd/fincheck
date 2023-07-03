import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveTransactionsService {
  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
