import { Controller, Get } from '@nestjs/common';
import { UsersApiPath } from '../users-api.constants';
import { ExtractUserId } from 'src/shared/decorators';
import { GetUserResponseDto } from './dto';
import { GetUserByIdService } from '../../services';

@Controller(UsersApiPath)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get('me')
  getById(@ExtractUserId() id: string): Promise<GetUserResponseDto> {
    return this.getUserByIdService.execute(id);
  }
}
