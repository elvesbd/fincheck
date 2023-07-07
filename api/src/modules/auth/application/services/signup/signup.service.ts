import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignupDto, SignupResponseDto } from 'src/modules/auth/dto/signup';
import { Hasher } from 'src/shared/adapters/cryptography/bcrypt';
import {
  CreateUserService,
  GetUserByEmailService,
} from 'src/modules/users/application/services';
import {
  Encrypt,
  EncryptedPayloadDto,
} from 'src/shared/adapters/cryptography/jwt';

@Injectable()
export class SignupService {
  constructor(
    @Inject('HASHER')
    private readonly hasher: Hasher,
    @Inject('ENCRYPT')
    private readonly encrypt: Encrypt,
    private readonly createUserService: CreateUserService,
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {}

  async execute(signupDto: SignupDto): Promise<SignupResponseDto> {
    const { email, password } = signupDto;

    const user = await this.getUserByEmailService.execute(email);
    if (user?.email) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await this.generatePasswordHash(password);
    const data = {
      ...signupDto,
      password: hashedPassword,
    };
    const { id } = await this.createUserService.execute(data);
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
