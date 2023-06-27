import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create/create-user.controller';
import { CreateUserService } from './services/create/create.service';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/users/user-repository-prisma-adapter.service';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt/bcrypt-adapter.service';

@Module({
  controllers: [CreateUserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryPrismaAdapter,
    },
    {
      provide: 'HASH',
      useClass: BcryptAdapter,
    },
    CreateUserService,
  ],
})
export class UsersModule {}
