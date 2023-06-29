import { Controller, Get } from '@nestjs/common';
import { API_PATH } from '../constants.controller';
import { GetUserByIdService } from '../../services/get-by-id/get-by-id.service';
import { GetByIdResponseDto } from './dto/get-by-id-response.dto';
import { ExtractUserId } from 'src/shared/decorators/extract-user-id.decorator';

@Controller(API_PATH)
export class GetUserByIdController {
  constructor(private readonly getUserByIdService: GetUserByIdService) {}

  @Get('me')
  getById(@ExtractUserId() id: string): Promise<GetByIdResponseDto> {
    return this.getUserByIdService.execute(id);
  }
}
