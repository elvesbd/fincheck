import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../service/prisma.service';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/controllers/create/dto/create-bank-account.dto';
import { BankAccount } from '@prisma/client';
import { BankAccountsRepository } from 'src/modules/bank-accounts/repository/bank-accounts.interface';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/controllers/update/dto/update-bank-account.dto';
import { BankAccountResponseDto } from 'src/modules/bank-accounts/repository/dto/bank-account-response.dto';

@Injectable()
export class BankAccountsRepositoryPrismaAdapter
  implements BankAccountsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  findByUserId(id: string): Promise<BankAccountResponseDto[]> {
    return this.prismaService.bankAccount.findMany({
      where: { userId: id },
    });
  }

  findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<BankAccountResponseDto> {
    return this.prismaService.bankAccount.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

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

  update(
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccountResponseDto> {
    const { name, initialBalance, type, color } = updateBankAccountDto;
    return this.prismaService.bankAccount.update({
      where: { id },
      data: {
        name,
        initialBalance,
        type,
        color,
      },
    });
  }
}
