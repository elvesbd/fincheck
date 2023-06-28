import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from '../../services/signup/signup.service';
import { SignupDto } from '../../dto/signup.dto';
import { SignupResponseDto } from '../../dto/signup/signup-response.dto';

@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('signup')
  async create(@Body() signupDto: SignupDto): Promise<SignupResponseDto> {
    return this.signupService.execute(signupDto);
  }
}
