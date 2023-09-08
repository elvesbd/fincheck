import { Test, TestingModule } from '@nestjs/testing';
import * as bcryptjs from 'bcryptjs';
import { BcryptAdapter } from './bcrypt-adapter.service';

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return 'hashedPassword';
  },

  async compare(): Promise<boolean> {
    return true;
  },
}));

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptAdapter],
    }).compile();

    sut = module.get<BcryptAdapter>(BcryptAdapter);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('hash()', () => {
    const salt = 10;

    it('should call bcryptjs.hash with correct values', async () => {
      const bcryptHashSpy = jest.spyOn(bcryptjs, 'hash');
      await sut.hash('any_value', salt);
      expect(bcryptHashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    it('should be return hashed password on success', async () => {
      const result = await sut.hash('any_value', salt);
      expect(result).toBe('hashedPassword');
    });
  });

  describe('compare()', () => {
    const bcryptCompareSpy = jest.spyOn(bcryptjs, 'compare');

    it('should call bcryptjs.compare with correct values', async () => {
      await sut.compare('password', 'hash');

      expect(bcryptCompareSpy).toHaveBeenCalledTimes(1);
      expect(bcryptCompareSpy).toHaveBeenCalledWith('password', 'hash');
    });

    it('should be returns true when bcryptjs.compare return true', async () => {
      const result = await sut.compare('password', 'hash');
      expect(result).toBe(true);
    });

    it('should be returns false when bcryptjs.compare return false', async () => {
      jest.spyOn(bcryptjs, 'compare').mockImplementationOnce(() => false);

      const result = await sut.compare('password', 'hash');
      expect(result).toBe(false);
    });
  });
});
