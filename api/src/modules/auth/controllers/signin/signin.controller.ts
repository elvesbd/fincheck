import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from '../../services/signin/signin.service';
import { SigninDto } from '../../dto/signin.dto';
import { API_PATH } from '../constants.controller';

@Controller(API_PATH)
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post('signin')
  authenticate(@Body() signinDto: SigninDto) {
    return this.signinService.execute(signinDto);
  }
}
