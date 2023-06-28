import { Global, Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma/service/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'unsecure_jwt_secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
