import { Module } from '@nestjs/common';
import { SigninController } from './controllers/signin/signin.controller';
import { SigninService } from './services/signin/signin.service';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt/bcrypt-adapter.service';
import { JwtAdapter } from 'src/shared/adapters/cryptography/jwt/jwt-adapter.service';
import { SignupController } from './controllers/signup/signup.controller';
import { SignupService } from './services/signup/signup.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SigninController, SignupController],
  providers: [
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
