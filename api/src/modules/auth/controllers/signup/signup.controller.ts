import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from '../../services/signup/signup.service';
import { SignupResponseDto } from '../../dto/signup/signup-response.dto';
import { SignupDto } from '../../dto/signup/signup.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthApiPath } from '../auth-api.constants';

@Controller(AuthApiPath)
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @IsPublic()
  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<SignupResponseDto> {
    return this.signupService.execute(signupDto);
  }
}
