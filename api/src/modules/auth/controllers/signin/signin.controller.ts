import { Body, Controller, Post } from '@nestjs/common';
import { SigninService } from '../../services/signin/signin.service';
import { SigninDto } from '../../dto/signin.dto';

@Controller('auth')
export class SigninController {
  constructor(private readonly authService: SigninService) {}

  @Post('signin')
  authenticate(@Body() signinDto: SigninDto) {
    return this.authService.authenticate(signinDto);
  }
}
