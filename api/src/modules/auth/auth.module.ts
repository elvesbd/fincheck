import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SigninService, SignupService } from './application/services';
import { SigninController, SignupController } from './controllers';
import { BcryptAdapter } from 'src/shared/adapters/cryptography/bcrypt';
import { JwtAdapter } from 'src/shared/adapters/cryptography/jwt';

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
