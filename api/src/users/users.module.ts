import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create/create-user.controller';
import { CreateUserService } from './services/create/create.service';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class UsersModule {}
