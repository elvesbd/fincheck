import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const ExtractUserId = createParamDecorator<undefined>(
  (data, ctx: ExecutionContext) => {
    console.log('extract');
    const request: Request = ctx.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) {
      throw new UnauthorizedException('');
    }
    return userId;
  },
);
