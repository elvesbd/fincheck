import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const ExtractUserId = createParamDecorator<undefined>(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const userId = request.userId;
    console.log('extract', userId);

    if (!userId) {
      throw new UnauthorizedException('');
    }
    return userId;
  },
);
