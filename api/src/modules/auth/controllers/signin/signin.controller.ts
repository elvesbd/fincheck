import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SigninService } from '../../services/signin/signin.service';
import { SigninDto } from '../../dto/signin/signin.dto';
import { SigninResponseDto } from '../../dto/signin/signin-response.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthApiPath, AuthApiTag } from '../auth-api.constants';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(AuthApiTag)
@Controller(AuthApiPath)
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @ApiCreatedResponse({ type: SigninResponseDto })
  @ApiBody({ type: SigninDto })
  @IsPublic()
  @Post('signin')
  authenticate(@Body() signinDto: SigninDto): Promise<SigninResponseDto> {
    return this.signinService.execute(signinDto);
  }
}
