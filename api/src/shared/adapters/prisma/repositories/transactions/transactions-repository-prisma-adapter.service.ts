import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from '../../service/prisma.service';
import { TransactionsRepository } from 'src/modules/transactions/repository/transaction-repository';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from 'src/modules/transactions/controllers';
import { FiltersDto } from 'src/modules/transactions/controllers/find-all/dto/filters.dto';

@Injectable()
export class TransactionsRepositoryPrismaAdapter
  implements TransactionsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string, filters: FiltersDto): Promise<Transaction[]> {
    const { month, year, bankAccountId } = filters;
    return await this.prismaService.transaction.findMany({
      where: {
        userId,
        bankAccountId,
        date: {
          gte: new Date(Date.UTC(year, month)),
          lt: new Date(Date.UTC(year, month + 1)),
        },
      },
    });
  }

  async findFirst(transactionId: string, userId: string): Promise<Transaction> {
    return await this.prismaService.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
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

  async update(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;
    return await this.prismaService.transaction.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async remove(transactionId: string): Promise<void> {
    await this.prismaService.transaction.delete({
      where: { id: transactionId },
    });
  }
}
