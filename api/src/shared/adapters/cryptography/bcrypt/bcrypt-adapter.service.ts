import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Hash } from '../interfaces/hash.interface';

@Injectable()
export class BcryptAdapter implements Hash {
  async generate(password: string, salt: string | number): Promise<string> {
    return await hash(password, salt);
  }
}
