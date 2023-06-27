import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [UsersModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
