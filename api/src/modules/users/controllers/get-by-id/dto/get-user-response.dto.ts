import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
