import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty()
  accessToken: string;
}
