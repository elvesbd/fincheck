import { Module } from '@nestjs/common';
import {
  BcryptAdapter,
  UserRepositoryPrismaAdapter,
} from 'src/shared/adapters';
import { GetUserByIdController } from './controllers';
import {
  GetUserByIdService,
  GetUserByEmailService,
  CreateUserService,
} from './application/services';

@Module({
  controllers: [GetUserByIdController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryPrismaAdapter,
    },
    {
      provide: 'HASHER',
      useClass: BcryptAdapter,
    },
    GetUserByIdService,
    GetUserByEmailService,
    CreateUserService,
  ],
  exports: [GetUserByEmailService, CreateUserService],
})
export class UsersModule {}
