import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { Hasher } from '../interfaces/hasher.interface';

@Injectable()
export class BcryptAdapter implements Hasher {
  async hash(password: string, salt: string | number): Promise<string> {
    return await hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
