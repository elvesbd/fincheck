import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/user-repository.interface';
import { Hasher } from 'src/shared/adapters/cryptography/interfaces/hasher.interface';
import { Encrypt } from 'src/shared/adapters/cryptography/jwt/interfaces/encrypt.interface';
import { SignupDto } from '../../dto/signup.dto';
import { EncryptedPayloadDto } from 'src/shared/adapters/cryptography/jwt/dto/encrypted-payload.dto';
import { SignupResponseDto } from '../../dto/signup/signup-response.dto';

@Injectable()
export class SignupService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
    @Inject('HASHER')
    private readonly hasher: Hasher,
    @Inject('ENCRYPT')
    private readonly encrypt: Encrypt,
  ) {}

  async execute(signupDto: SignupDto): Promise<SignupResponseDto> {
    const { email, password } = signupDto;

    const user = await this.userRepository.findByEmail(email);
    if (user?.email) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await this.generatePasswordHash(password);
    const data = {
      ...signupDto,
      password: hashedPassword,
    };
    const { id } = await this.userRepository.create(data);
    const accessToken = await this.generateAccessToken(id);

    return { accessToken };
  }

  private async generatePasswordHash(password: string): Promise<string> {
    return this.hasher.hash(password, 10);
  }

  private async generateAccessToken(userId: string): Promise<string> {
    const payload: EncryptedPayloadDto = {
      sub: userId,
    };
    return this.encrypt.signAsync(payload);
  }
}
