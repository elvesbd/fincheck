import { EncryptedPayloadDto } from '../dto/encrypted-payload.dto';

export interface Encrypt {
  signAsync(payload: EncryptedPayloadDto): Promise<string>;
}
