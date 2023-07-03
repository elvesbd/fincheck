import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { TransactionsRepository } from 'src/modules/transactions/repository/transaction-repository';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsRepositoryPrismaAdapter
  implements TransactionsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
    });
  }
}
