import { Module } from '@nestjs/common';
import { CreateBankAccountsController } from './controllers/create/create.controller';
import { FinAllBankAccountsController } from './controllers/find-all/find-all.controller';
import { UpdateBankAccountsController } from './controllers/update/update.controller';
import { CreateBankAccountsService } from './services/create/create.service';
import { FindAllBankAccountsService } from './services/find-all/find-all.service';
import { RemoveBankAccountsService } from './services/remove/remove.service';
import { UpdateBankAccountsService } from './services/update/update.service';
import { RemoveBankAccountsController } from './controllers/remove/remove.controller';

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
];

@Module({
  controllers: [...bankAccountsControllers],
  providers: [...bankAccountsServices],
})
export class BankAccountsModule {}
