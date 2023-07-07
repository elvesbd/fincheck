import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByEmailService } from 'src/modules/users/application/services';
import { SigninDto, SigninResponseDto } from 'src/modules/auth/dto/signin';
import { Hasher } from 'src/shared/adapters/cryptography/bcrypt';
import {
  Encrypt,
  EncryptedPayloadDto,
} from 'src/shared/adapters/cryptography/jwt';

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
