import { Controller, Get } from '@nestjs/common';
import { UsersApiPath, UsersApiTag } from '../users-api.constants';
import { ExtractUserId } from 'src/shared/decorators';
import { GetUserResponseDto } from './dto';
import { GetUserByIdService } from '../../application/services';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags(UsersApiTag)
@Controller(UsersApiPath)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @ApiOkResponse({ type: GetUserResponseDto })
  @Get('me')
  getById(@ExtractUserId() id: string): Promise<GetUserResponseDto> {
    return this.getUserByIdService.execute(id);
  }
}
