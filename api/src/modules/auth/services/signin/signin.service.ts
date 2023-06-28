import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from '../../dto/signin.dto';
import { UserRepository } from 'src/modules/users/repository/user-repository.interface';
import { Hasher } from 'src/shared/adapters/cryptography/interfaces/hasher.interface';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt/interfaces/encrypt.interface';
import { EncryptedPayloadDto } from 'src/shared/adapters/cryptography/jwt/dto/encrypted-payload.dto';

@Injectable()
export class SigninService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    @Inject('HASHER')
    private readonly hash: Hasher,
    @Inject('ENCRYPT')
    private readonly encrypt: Encrypt,
  ) {}

  async authenticate(signinDto: SigninDto): Promise<any> {
    const { email, password } = signinDto;

    const user = await this.userRepository.findByEmail(email);
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
