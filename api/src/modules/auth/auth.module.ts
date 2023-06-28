import { Module } from '@nestjs/common';
import { SigninController } from './controllers/signin/signin.controller';
import { SigninService } from './services/signin/signin.service';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/users/user-repository-prisma-adapter.service';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt/bcrypt-adapter.service';
import { JwtAdapter } from 'src/shared/adapters/cryptography/jwt/jwt-adapter.service';

@Module({
  controllers: [SigninController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepositoryPrismaAdapter,
    },
    {
      provide: 'HASHER',
      useClass: BcryptAdapter,
    },
    {
      provide: 'ENCRYPT',
      useClass: JwtAdapter,
    },
    SigninService,
  ],
})
export class AuthModule {}
