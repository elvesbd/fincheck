import { Module } from '@nestjs/common';
import { CreateBankAccountsController } from './controllers/create/create.controller';
import { FinAllBankAccountsController } from './controllers/find-all/find-all.controller';
import { UpdateBankAccountsController } from './controllers/update/update.controller';
import { RemoveBankAccountsController } from './controllers/remove/remove.controller';
import { BankAccountsRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/bank-accounts/bank-accounts-repository-prisma-adapter.service';
import { ValidateBankAccountOwnerShipService } from './domain/validate-bank-account-owner-ship.service';
import { CreateBankAccountsService } from './application/services/create/create.service';
import { FindAllBankAccountsService } from './application/services/find-all/find-all.service';
import { RemoveBankAccountsService } from './application/services/remove/remove.service';
import { UpdateBankAccountsService } from './application/services/update/update.service';

const bankAccountsControllers = [
  CreateBankAccountsController,
  UpdateBankAccountsController,
  FinAllBankAccountsController,
  RemoveBankAccountsController,
];
const bankAccountsServices = [
  CreateBankAccountsService,
  RemoveBankAccountsService,
  FindAllBankAccountsService,
  UpdateBankAccountsService,
  ValidateBankAccountOwnerShipService,
];

@Module({
  controllers: [...bankAccountsControllers],
  providers: [
    {
      provide: 'BANK_ACCOUNTS_REPOSITORY',
      useClass: BankAccountsRepositoryPrismaAdapter,
    },
    ...bankAccountsServices,
  ],
  exports: [ValidateBankAccountOwnerShipService, 'BANK_ACCOUNTS_REPOSITORY'],
})
export class BankAccountsModule {}
