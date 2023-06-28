import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypt } from './interfaces/encrypt.interface';
import { EncryptedPayloadDto } from './dto/encrypted-payload.dto';

@Injectable()
export class JwtAdapter implements Encrypt {
  constructor(private readonly jwtService: JwtService) {}

  async signAsync(payload: EncryptedPayloadDto): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
