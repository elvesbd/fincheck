import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/controllers/create/dto/create-bank-account.dto';
import { BankAccount } from '@prisma/client';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';

@Injectable()
export class BankAccountsRepositoryPrismaAdapter
  implements BankAccountsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  create(
    id: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    const { name, initialBalance, type, color } = createBankAccountDto;
    return this.prismaService.bankAccount.create({
      data: {
        userId: id,
        name,
        initialBalance,
        type,
        color,
      },
    });
  }

  findByUserId(id: string): Promise<any> {
    return this.prismaService.bankAccount.findMany({
      where: { userId: id },
    });
  }
}
