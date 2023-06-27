import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create/create-user.controller';
import { CreateUserService } from './services/create/create.service';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/users/UserRepositoryPrismaAdapter.service';

@Module({
  controllers: [CreateUserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryPrismaAdapter,
    },
    CreateUserService,
  ],
})
export class UsersModule {}
