import { Module } from '@nestjs/common';
import { SigninController } from './controllers/signin/signin.controller';
import { SigninService } from './services/signin/signin.service';
import { UserRepositoryPrismaAdapter } from 'src/shared/adapters/prisma/repositories/users/user-repository-prisma-adapter.service';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt/bcrypt-adapter.service';
import { JwtAdapter } from 'src/shared/adapters/cryptography/jwt/jwt-adapter.service';
import { SignupController } from './controllers/signup/signup.controller';
import { SignupService } from './services/signup/signup.service';

@Module({
  controllers: [SigninController, SignupController],
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
    SignupService,
  ],
})
export class AuthModule {}
