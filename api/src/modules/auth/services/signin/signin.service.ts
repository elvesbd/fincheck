import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Hasher } from 'src/shared/adapters/cryptography/interfaces/hasher.interface';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt/interfaces/encrypt.interface';
import { EncryptedPayloadDto } from 'src/shared/adapters/cryptography/jwt/dto/encrypted-payload.dto';
import { SigninResponseDto } from '../../dto/signin/signin-response.dto';
import { SigninDto } from '../../dto/signin/signin.dto';
import { GetUserByEmailService } from 'src/modules/users/services';

@Injectable()
export class SigninService {
  constructor(
    @Inject('HASHER')
    private readonly hash: Hasher,
    @Inject('ENCRYPT')
    private readonly encrypt: Encrypt,
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {}

  async execute(signinDto: SigninDto): Promise<SigninResponseDto> {
    const { email, password } = signinDto;

    const user = await this.getUserByEmailService.execute(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const isPasswordValid = await this.hash.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload: EncryptedPayloadDto = {
      sub: user.id,
    };
    const accessToken = await this.encrypt.signAsync(payload);

    return { accessToken };
  }
}
