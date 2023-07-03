import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { TransactionsRepository } from 'src/modules/transactions/repository/transaction-repository';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from 'src/modules/transactions/controllers';

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

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<any> {
    const { bankAccountId, categoryId, name, value, date, type } =
      createTransactionDto;
    return await this.prismaService.transaction.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }
}
