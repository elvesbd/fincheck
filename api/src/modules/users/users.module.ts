import { Module } from '@nestjs/common';
import { GetUserByIdController } from './controllers';
import {
  GetUserByIdService,
  GetUserByEmailService,
  CreateUserService,
} from './application/services';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories';

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
