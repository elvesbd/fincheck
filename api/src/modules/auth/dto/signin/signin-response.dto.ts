import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty()
  accessToken: string;
}
