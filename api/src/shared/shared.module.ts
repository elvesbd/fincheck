import { Global, Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma/service/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from './config/env';
@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}
