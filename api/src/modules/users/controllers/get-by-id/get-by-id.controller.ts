import { Controller, Get, Req } from '@nestjs/common';
import { API_PATH } from '../constants.controller';
import { GetUserByIdService } from '../../services/get-by-id/get-by-id.service';

@Controller(API_PATH)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get('me')
  getById(@Req() request: any): Promise<any> {
    console.log({ meUserId: request.userId });
    return this.getUserByIdService.execute();
  }
}
