import { Body, Controller, Post } from '@nestjs/common';
import { SigninDto } from '../../dto/signin/signin.dto';
import { SigninResponseDto } from '../../dto/signin/signin-response.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthApiPath, AuthApiTag } from '../auth-api.constants';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SigninService } from '../../application/services';

@ApiTags(AuthApiTag)
@Controller(AuthApiPath)
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @ApiOperation({ summary: 'Login to the application' })
  @ApiCreatedResponse({ type: SigninResponseDto })
  @ApiBody({ type: SigninDto })
  @IsPublic()
  @Post('signin')
  authenticate(@Body() signinDto: SigninDto): Promise<SigninResponseDto> {
    return this.signinService.execute(signinDto);
  }
}
