import { Controller, Get, Req } from '@nestjs/common';
import { API_PATH } from '../constants.controller';
import { GetUserByIdService } from '../../services/get-by-id/get-by-id.service';
import { GetByIdResponseDto } from './dto/get-by-id-response.dto';
import { Request } from 'express';

@Controller(API_PATH)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get('me')
  getById(@Req() request: Request): Promise<GetByIdResponseDto> {
    const id = request.userId;
    return this.getUserByIdService.execute(id);
  }
}
