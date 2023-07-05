import { Module } from '@nestjs/common';
import {
  BcryptAdapter,
  UserRepositoryPrismaAdapter,
} from 'src/shared/adapters';
import {
  CreateUserService,
  GetUserByEmailService,
  GetUserByIdService,
} from './services';
import { GetUserByIdController } from './controllers';

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
