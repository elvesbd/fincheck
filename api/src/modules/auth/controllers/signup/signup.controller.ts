import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { SignupService } from '../../services/signup/signup.service';
import { SignupResponseDto } from '../../dto/signup/signup-response.dto';
import { API_PATH } from '../constants.controller';
import { SignupDto } from '../../dto/signup/signup.dto';
import { IsPublic } from '../../decorators/is-public.decorator';

@Controller(API_PATH)
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @IsPublic()
  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<SignupResponseDto> {
    return this.signupService.execute(signupDto);
  }
}
