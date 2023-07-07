import { Body, Controller, Post } from '@nestjs/common';
import { SignupResponseDto } from '../../dto/signup/signup-response.dto';
import { SignupDto } from '../../dto/signup/signup.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthApiPath, AuthApiTag } from '../auth-api.constants';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignupService } from '../../application/services';

@ApiTags(AuthApiTag)
@Controller(AuthApiPath)
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @ApiCreatedResponse({ type: SignupResponseDto })
  @ApiBody({ type: SignupDto })
  @IsPublic()
  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<SignupResponseDto> {
    return this.signupService.execute(signupDto);
  }
}
