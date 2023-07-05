import { Controller, Get } from '@nestjs/common';
import { GetUserByIdService } from '../../services/get-by-id/get-by-id.service';
import { GetByIdResponseDto } from './dto/get-by-id-response.dto';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';
import { UsersApiPath } from '../users-api.constants';

@Controller(UsersApiPath)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get('me')
  getById(@ExtractUserId() id: string): Promise<GetByIdResponseDto> {
    return this.getUserByIdService.execute(id);
  }
}
