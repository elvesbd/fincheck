import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllTransactionsService {
  findAll() {
    return `This action returns all transactions`;
  }
}
