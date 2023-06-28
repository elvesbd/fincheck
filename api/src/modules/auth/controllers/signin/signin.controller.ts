import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from '../../services/signin/signin.service';
import { API_PATH } from '../constants.controller';
import { SigninDto } from '../../dto/signin/signin.dto';
import { SigninResponseDto } from '../../dto/signin/signin-response.dto';

@Controller(API_PATH)
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post('signin')
  authenticate(@Body() signinDto: SigninDto): Promise<SigninResponseDto> {
    return this.signinService.execute(signinDto);
  }
}
