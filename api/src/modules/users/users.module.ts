import { Module } from '@nestjs/common';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/users/user-repository-prisma-adapter.service';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt/bcrypt-adapter.service';
import { GetUserByIdService } from './services/get-by-id/get-by-id.service';
import { GetUserByIdController } from './controllers/get-by-id/get-by-id.controller';

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
  ],
})
export class UsersModule {}
